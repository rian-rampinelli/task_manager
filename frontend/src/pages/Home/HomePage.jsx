import Categorias from '../../components/Categorias'
import NavBar from '../../components/NavBar'
import Tasks from '../../components/Tasks'
import { useState,useEffect } from 'react'
import {getCategorys,createCategory,deleteCategory} from "../../api/category.js"


function HomePage(){
    
    const [categorias,setCategorias] = useState([])

    async function loadCategorys() {

    const data = await getCategorys()
    setCategorias(data)
    
    
    }

     
    async function handleCreateCategory() {

    await createCategory({
        name: "trabalho",
        emoji:"LOW",
        description:"teste",  
        idUser:10,
      
    })

    loadCategorys()
    }

    async function handleDeleteCategory(id) {

        await deleteCategory(id)
        await loadCategorys()
    }


    useEffect(() => {
    loadCategorys()

    }, [])
    
    return ( 
    <div>
        <NavBar></NavBar>
        
        <Categorias
        categorias ={categorias}
        createCategory={handleCreateCategory}
        deleteCategory={handleDeleteCategory}
        ></Categorias>

        <Tasks 
        >
        
        </Tasks>
    </div>
    )
    
    
}

export default HomePage
