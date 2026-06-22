import { createTask } from "../api/tasks"
import { useState } from "react"
import { X } from "lucide-react"

function ModalTask({ isOpen, setOpenModal, categorys, idCategory, loadTasks }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [statusLevel, setStatusLevel] = useState("TODO")
    const [priority, setPriority] = useState("")
    const [idUser, setIdUser] = useState(10)
    const [idCategoryCreate, setIdCategoryCreate] = useState(idCategory)

    async function handleCreateTask(e) {
        e.preventDefault()   
    if (!name.trim()) {
        alert("Informe o nome da tarefa!");
        return;
    }
    if (!description.trim()) {
        alert("Informe a descrição!");
        return;
    }
    if (!priority) {
        alert("Selecione uma prioridade!");
        return;
    }
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
        <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-[1000] animate-backdrop-in">
            <form
                className="w-[26rem] rounded-2xl shadow-2xl bg-white overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-modal-in"
                onSubmit={(e) => handleCreateTask(e)}
            >
                <div className="px-7 py-7">
                    <div className="flex items-center justify-between text-center mb-6">
                        <h2 className="text-xl flex-1 ml-10 font-bold text-zinc-900">
                            Nova tarefa
                        </h2>
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="p-1.5 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors duration-150"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-zinc-700">Nome da tarefa</label>
                        <input
                            className="outline-none border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 w-full mt-1.5 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150"
                            type="text"
                            placeholder="Estudar"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 mt-4">
                        <div className="w-full">
                            <label className="text-sm font-semibold text-zinc-700">Prioridade</label>
                            <select
                                className="outline-none border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 w-full mt-1.5 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150 cursor-pointer"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >

                                <option value="" disabled>
                                    ...
                                </option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-semibold text-zinc-700">Categoria</label>
                            <select
                                className="outline-none border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 w-full mt-1.5 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150 cursor-pointer "
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
                        <label className="text-sm font-semibold text-zinc-700">Descrição</label>
                        <input
                            className="outline-none border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 w-full mt-1.5 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150"
                            type="text"
                            placeholder="Terminar o projeto de React"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mt-8 flex gap-3">
                        
                        <button
                            className="flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-150"
                            type="submit"
                        >
                            Criar tarefa
                        </button>
                    </div>
                </div>
            </form>
        </div>
        )
    }

    return null
}

export default ModalTask;