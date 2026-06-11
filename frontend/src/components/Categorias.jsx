import { useEffect } from "react"
import Tasks from "./Tasks.jsx"

function Categorias({categorias,createCategory,deleteCategory,loadCategorys,loadTasks,selectCategory,setIdCategory,tasks}) {


    useEffect(() => {
    loadCategorys()
    }, [])

    return(
    <>
    <p className="mt-8 mb-2.5 text-xl font-semibold" >
        Categorias
    </p>
    
    <ul className="flex gap-5">
        {categorias.map(category =>(
            <li  key={category.id}>
             <button type="button" onClick={() => setIdCategory(category.id)}  class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
            border-blue-600
            border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                {category.name}
            </button>
                
            </li>
        ))}
         <button
        onClick={() => createCategory()}
        title="Add New"
        class="group cursor-pointer outline-none hover:rotate-90 duration-300"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46px"
            height="46px"
            viewBox="0 0 24 24"
            class="stroke-blue-400 fill-none group-hover:brightness-110 group-hover:stroke-blue-600 group-active:stroke-zinc-200 group-active:fill-blue-500 group-active:duration-0 duration-300"
        >
            <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            stroke-width="1.5"
            ></path>
            <path d="M8 12H16" stroke-width="1.5"></path>
            <path d="M12 16V8" stroke-width="1.5"></path>
        </svg>
        </button>
    </ul>

    <Tasks  idCategory={selectCategory} loadTasks={loadTasks} tasks={tasks}></Tasks>
   
    </>
    )
}

export default Categorias
