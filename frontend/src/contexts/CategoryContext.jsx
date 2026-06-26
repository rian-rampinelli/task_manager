import {createContext,useState } from "react";
import {getCategorys,createCategory,deleteCategory} from "../api/category.js"
import {getTasksByCategory} from "../api/category.js"

export const CategoryContext = createContext()

export const CategoryProvider = ({children})=>{
    
    const [categorias,setCategorias] = useState([])
    const [tasksByCategory,setTasksByCategory] = useState([])
    const [idCategory, setIdCategory] = useState(196)

    async function loadCategorys() {
    const data = await getCategorys()
    setCategorias(data)
    }

    async function loadTasksByCategory(idCategory){
    const data = await getTasksByCategory(idCategory)
    setTasksByCategory(data)

    }
     
    async function handleCreateCategory(nameCategory,emojiCategory,descriptionCategory,idUser) {
    await createCategory({
        name: nameCategory,
        emoji: emojiCategory,
        description: descriptionCategory,
        idUser: idUser,
    })
    loadCategorys()
    }

    async function handleDeleteCategory(id) {
        await deleteCategory(id)
        await loadCategorys()
        await loadTasksByCategory(id)
    }
    

    return(
        <CategoryContext.Provider value={{categorias,idCategory,setIdCategory,loadCategorys,handleCreateCategory,handleDeleteCategory,loadTasksByCategory,tasksByCategory,setTasksByCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}