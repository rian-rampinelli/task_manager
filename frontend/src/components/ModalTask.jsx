import { createTask} from "../api/tasks"
import { useState } from "react"



function ModalTask({isOpen,setOpenModal,categorys,idCategory,loadTasks}) {


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [statusLevel, setStatusLevel] = useState("TODO")
    const [priority, setPriority] = useState("LOW")
    const [idUser, setIdUser] = useState(10)
    const [idCategoryCreate, setIdCategoryCreate] = useState(idCategory)


    async function handleCreateTask(e) {
        e.preventDefault() 
        await createTask({
            title:name,
            description:description,
            statusLevel:statusLevel,
            priority:priority,
            idUser:idUser,
            idCategory:idCategoryCreate
        })
        await loadTasks(idCategory)
        setOpenModal(false)
        }

    if (isOpen) {
        return (
        <div className="fixed inset-0 bg-zinc-950/70 z-[1000]">
            <form className="w-120 rounded-lg shadow h-auto px-6 py-12 bg-zinc-50 overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onSubmit={(e) => handleCreateTask(e)}>
                <h2 class="text-2xl font-medium text-zinc-900 text-center">New Task</h2>
                <div className="mt-3">
                    <label className="text-zinc-900">Nome da tarefa:</label>
                    <input
                    className="outline-none border-2 rounded-md px-2 py-1 text-zinc-900 w-full focus:border-teal-600"
                    type="text"
                    placeholder="Estudar"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </div>
                
                <div className="flex gap-20 justify-around ">
                    <div  className="mt-3">
                        <label className="text-zinc-900" Htmlfor="priority" >Prioridade:</label>
                        <select id="priority" class="outline-none border-2 rounded-md px-2 py-1 text-zinc-900 w-full focus:border-teal-600"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}>
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>
                    <div  className="mt-3">
                        <label className="text-zinc-900"
                        Htmlfor="category"
                        >Categoria:</label>
                        <select
                        id="priority" class="outline-none border-2 rounded-md px-2 py-1 text-zinc-900 w-full focus:border-teal-600"
                        value={idCategoryCreate}
                        onChange={(e) => setIdCategoryCreate(Number(e.target.value))
                        }>
                        {categorys.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                        </select>
                    </div>
                </div>
                 <div  className="mt-3">
                    <label className="text-zinc-900">Descrição:</label>
                    <input
                     className="outline-none border-2 rounded-md px-2 py-1 text-zinc-900 w-full focus:border-teal-600"
                    type="text"
                    placeholder="Terminar o projeto de React"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mt-12 flex justify-around">
                    <button 
                    className="bg-teal-700 text-white
                    px-16 py-2 rounded hover:bg-teal-600" 
                    type="submit"
                    >Criar</button>
                    <button className="bg-zinc-900 text-white px-15 py-2 rounded hover:bg-zinc-700"
                    onClick={()=> setOpenModal(false)}
                    >Fechar</button>
                </div>
            </form>
        </div>
        )
    }

    return null
}

export default ModalTask;
