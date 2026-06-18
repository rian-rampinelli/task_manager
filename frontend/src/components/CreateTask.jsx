import { useState } from "react"
import ModalTask from "./ModalTask.jsx"


function CreateTasks({ categorys, idCategory, loadTasks }) {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <ModalTask
                categorys={categorys}
                idCategory={idCategory}
                isOpen={openModal}
                setOpenModal={setOpenModal}
                loadTasks={loadTasks}
            />

            <button
                id="add-task"
                onClick={() => setOpenModal(!openModal)}
                className="
                    flex items-center gap-3
                    px-6 py-3
                    rounded-xl
                    bg-zinc-900
                    text-white
                    font-semibold
                    tracking-wide
                    shadow-md
                    transition-all duration-300
                    hover:bg-zinc-800
                    hover:shadow-lg
                    hover:-translate-y-0.5
                    active:translate-y-0
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

                Adicionar Task
            </button>
        </>
    )
}

export default CreateTasks