import { useEffect, useState } from "react"
import Tasks from "./Tasks.jsx"
import ModalCategory from "./ModalCategory.jsx"

function Categorias({
    categorias,
    createCategory,
    deleteCategory,
    loadCategorys,
    loadTasks,
    selectCategory,
    setIdCategory,
    tasks
}) {
    const [OpenModal, setOpenModal] = useState(false)

    useEffect(() => {
        loadCategorys()
    }, [])

    return (
        <>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-700 mt-12 mb-5">
                    Categorias
                </p>

            

            <ul className="flex flex-wrap items-center gap-4">
                {categorias.map((category) => (
                    <li key={category.id}>
                        <button
                            type="button"
                            onClick={() => setIdCategory(category.id)}
                            className={`
                                px-5 py-2.5
                                rounded-xl
                                font-medium
                                shadow-sm
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                
                            `}
                        >
                            {category.name}
                        </button>
                    </li>
                ))}

                <li>
                    <button onClick={() => setOpenModal(true)} title="Add New Category" aria-label="Add new Category" className="group cursor-pointer outline-none hover:rotate-90 duration-300" > <svg xmlns="http://www.w3.org/2000/svg" width="46px" height="46px" viewBox="0 0 24 24" class="stroke-zinc-700 fill-none group-hover:brightness-110 group-hover:stroke-zinc-400 group-active:stroke-zinc-200 group-active:fill-zinc-400 group-active:duration-0 duration-300" > <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke-width="1.5" ></path> <path d="M8 12H16" stroke-width="1.5"></path> <path d="M12 16V8" stroke-width="1.5"></path> </svg> </button>
                </li>
            </ul>

            <ModalCategory
                createCategory={createCategory}
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
            />

            <Tasks
                idCategory={selectCategory}
                loadTasks={loadTasks}
                tasks={tasks}
            />
        </>
    )
}

export default Categorias