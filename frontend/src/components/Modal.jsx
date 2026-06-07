import { createTask} from "../api/tasks"
import { useState } from "react"

function Modal({isOpen,categorys,loadTasks}){


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [statusLevel, setStatusLevel] = useState("TODO")
    const [priority, setPriority] = useState("LOW")
    const [idUser, setIdUser] = useState(10)
    const [idCategory, setIdCategory] = useState(161)

    async function handleCreateTask(e) {
        e.preventDefault()
      
        await createTask({
            title:name,
            description:description,
            statusLevel:statusLevel,
            priority:priority,
            idUser:idUser,
            idCategory:idCategory
        })
    
        await loadTasks()
        }

    if (isOpen) {
        return (
        <>
            <form onSubmit={(e) => handleCreateTask(e)}>
                 <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Adicionar Task</button>
            
                <div>
                    <label>Nome da tarefa:</label>
                    <input
                    type="text"
                    placeholder="Estudar"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </div>
                 <div>
                    <label>Descrição:</label>
                    <input
                    type="text"
                    placeholder="Terminar o projeto de React"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Prioridade:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>
                <div>
                    <label>Categoria:</label>
                    <select value={idCategory} onChange={(e) => setIdCategory(e.target.value)}>
                    {categorys.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                    </select>
                </div>
            </form>
        </>
        )
    }

    return null
}

export default Modal