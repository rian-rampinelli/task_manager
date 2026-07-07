import { useEffect, useState,useContext } from "react"
import Tasks from "./Tasks.jsx"
import { CategoryContext } from "../contexts/CategoryContext.jsx"
import ModalCategory from "./ModalCategory.jsx"
import { Trash2 } from "lucide-react"
import { ButtonMain } from "./ui/ButtonMain.jsx"
import { getAllTasksByUser } from "@/api/tasks.js"

function Categorias() {
    
    const [OpenModal, setOpenModal] = useState(false)
    const [menu, setMenu] = useState({ visible: false, x: 0, y: 0, categoryId: null ,categoryName: null})
    const selectedButtonClass = "!bg-white !text-indigo-700 !border-indigo-300 ring-2 ring-indigo-300 shadow-lg shadow-indigo-700/30"

    const {categorias,idCategory,setIdCategory,handleCreateCategory,handleDeleteCategory,loadCategorys,loadTasksByCategory,tasksByCategory,setTasksByCategory} = useContext(CategoryContext)

    useEffect(() => {
        loadCategorys()
        handleGetTasksByUser()
    }, [])

    useEffect(() => {
    if (idCategory) {
        loadTasksByCategory(idCategory);
    }
    }, [idCategory]);

    async function handleGetTasksByUser(){
        const data = await getAllTasksByUser()
        const tasks = data
        setIdCategory(null)
        setTasksByCategory(tasks)
    }

    


    //fecha o content menu ao clicar fora
    useEffect(() => {
        function handleClick() {
            setMenu({ visible: false, x: 0, y: 0, categoryId: null })
        }
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])

    function handleRightClick(e, categoryId,categoryName) {
        e.preventDefault()
        
        if (categoryName === "Todas") return;
        setMenu({ visible: true, x: e.clientX, y: e.clientY, categoryId })
    }

   
    return (
        <>          
            <p className=" mt-10 mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-300">
                Categorias
            </p>
            <ul className="flex flex-wrap items-center justify-between gap-4">
                <li>
                    <ButtonMain
                        type="button"
                        onClick={handleGetTasksByUser}
                        className={idCategory === null ? selectedButtonClass : ""}
                    >
                        Todas
                    </ButtonMain>
                </li>

                {categorias.map((category) => (
                    <li key={category.id}>
                        <ButtonMain
                            type="button"
                            onClick={() => setIdCategory(category.id)}
                            onContextMenu={(e) => handleRightClick(e, category.id,category.name)}
                            className={idCategory === category.id ? selectedButtonClass : ""}
                            >
                            {category.name}
                        </ButtonMain>
                    </li>
                ))}

                <li className="mt-2">
                    <button onClick={() => setOpenModal(true)} title="Add New Category" aria-label="Add new Category" className="group cursor-pointer outline-none hover:rotate-90 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="46px" height="46px" viewBox="0 0 24 24" className="stroke-indigo-500 fill-none group-hover:brightness-110 group-hover:stroke-indigo-900 group-active:stroke-indigo-200 group-active:fill-indigo-400 group-active:duration-0 duration-300">
                            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5"></path>
                            <path d="M8 12H16" strokeWidth="1.5"></path>
                            <path d="M12 16V8" strokeWidth="1.5"></path>
                        </svg>
                    </button>
                </li>

                {Array.from({ length: 6 }).map((_, i) => (
                    <li key={`ghost-${i}`} className="w-28 h-0 invisible" aria-hidden="true" />
                ))}
            </ul>

            {menu.visible && (
                <ul
                    className="fixed bg-white shadow-lg rounded-xl  z-50 border border-zinc-100"
                    style={{ top: menu.y , left: menu.x + 5 }}
                >
                    <li>
                      
                         <button
                            onClick={() => handleDeleteCategory(menu.categoryId)}
                            disabled={menu.categoryName === "Todas"}
                            className="p-3 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-200 transition"
                        >
                            <Trash2 size={20} className="text-red-500 " />
                        </button>
                    </li>
                </ul>
            )}

            <ModalCategory
                createCategory={handleCreateCategory}
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
            />

            <Tasks/>
        </>
    )
}

export default Categorias
