import { useEffect } from "react"
import LoadTasks from "./LoadTasks.jsx"

function Categorias({categorias,createCategory,deleteCategory,loadCategorys,loadTasks,selectCategory,setIdCategory,tasks}) {


    useEffect(() => {
    loadCategorys()
    }, [])


    return(
    <>
    <p className="mt-10 mb-2.5 text-xl font-semibold" >
        Categorias:
    </p>
    
    <ul className="flex gap-5">
        {categorias.map(category =>(
            <li  key={category.id}>
                <button onClick={() => setIdCategory(category.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {category.name}
                </button>
                <button onClick={() => deleteCategory(category.id)}>Lixo</button>
            </li>
        ))}
         <button className="bg-gray-200 rounded-4xl py-2 px-4" onClick={() => createCategory()}>+</button>
    </ul>

    <LoadTasks  idCategory={selectCategory} loadTasks={loadTasks} tasks={tasks}></LoadTasks>
   
    </>
    )
}

export default Categorias
