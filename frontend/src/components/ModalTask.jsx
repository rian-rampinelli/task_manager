import { createTask } from "../api/tasks"
import { useState } from "react"

function ModalTask({ isOpen, setOpenModal, categorys, idCategory, loadTasks }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [statusLevel, setStatusLevel] = useState("TODO")
    const [priority, setPriority] = useState("LOW")
    const [idUser, setIdUser] = useState(10)
    const [idCategoryCreate, setIdCategoryCreate] = useState(idCategory)

    async function handleCreateTask(e) {
        e.preventDefault()
        await createTask({
            title: name,
            description: description,
            statusLevel: statusLevel,
            priority: priority,
            idUser: idUser,
            idCategory: idCategoryCreate
        })
        await loadTasks(idCategory)
        setOpenModal(false)
    }

    if (isOpen) {
        return (
        <div className="fixed inset-0 bg-zinc-950/60 z-[1000]">
            <form
                className="w-96 rounded-2xl shadow-xl px-6 py-10 bg-white overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onSubmit={(e) => handleCreateTask(e)}
            >
                <h2 className="text-2xl font-semibold text-zinc-900 text-center">
                    Nova Tarefa
                </h2>

                <div className="mt-4">
                    <label className="text-zinc-700 text-sm">Nome da tarefa:</label>
                    <input
                        className="outline-none border border-zinc-200 rounded-lg px-3 py-2 text-zinc-900 w-full mt-1 focus:border-zinc-400"
                        type="text"
                        placeholder="Estudar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="w-full">
                        <label className="text-zinc-700 text-sm">Prioridade:</label>
                        <select
                            className="outline-none border border-zinc-200 rounded-lg px-3 py-2 text-zinc-900 w-full mt-1 focus:border-zinc-400"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <label className="text-zinc-700 text-sm">Categoria:</label>
                        <select
                            className="outline-none border border-zinc-200 rounded-lg px-3 py-2 text-zinc-900 w-full mt-1 focus:border-zinc-400"
                            value={idCategoryCreate}
                            onChange={(e) => setIdCategoryCreate(Number(e.target.value))}
                        >
                            {categorys.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-zinc-700 text-sm">Descrição:</label>
                    <input
                        className="outline-none border border-zinc-200 rounded-lg px-3 py-2 text-zinc-900 w-full mt-1 focus:border-zinc-400"
                        type="text"
                        placeholder="Terminar o projeto de React"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mt-8 flex justify-around gap-3">
                    <button
                        className="bg-zinc-900 text-white px-12 py-2 rounded-xl hover:bg-zinc-500 transition"
                        type="submit"
                    >
                        Criar
                    </button>

                    <button
                        className="bg-zinc-300 text-zinc-900 px-12 py-2 rounded-xl hover:bg-zinc-500 transition"
                        onClick={() => setOpenModal(false)}
                        type="button"
                    >
                        Fechar
                    </button>
                </div>
            </form>
        </div>
        )
    }

    return null
}

export default ModalTask;