import { useState } from "react"
import ModalTask from "./ModalTask.jsx"
import { useContext } from "react"
import { CategoryContext } from "../contexts/CategoryContext.jsx"


function CreateTasks() {
    
    const [openModal, setOpenModal] = useState(false)

    const {categorias,idCategory,loadTasksByCategory} = useContext(CategoryContext)


    return (
        <>
            <ModalTask
                categorys={categorias}
                idCategory={idCategory}
                isOpen={openModal}
                setOpenModal={setOpenModal}
                loadTasks={loadTasksByCategory}
            />

            <button
                onClick={() => setOpenModal(!openModal)}
                title="Add new task"
                className="
                    flex items-center gap-3
                    mt-5
                    px-4 py-3
                    rounded-xl
                    bg-indigo-500
                    text-zinc-200
                    font-semibold
                    tracking-wide
                    shadow-md shadow-indigo-600/20
                    transition-all duration-300
                    hover:bg-indigo-700
                    hover:shadow-lg hover:shadow-indigo-600/25
                    hover:-translate-y-0.5
                    active:translate-y-0 active:scale-95
                    
                "
            >
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M17 15V18M17 21V18M17 18H14M17 18H20"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

               New Task
            </button>
        </>
    )
}

export default CreateTasks