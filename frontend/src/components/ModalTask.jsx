import { createTask } from "../api/tasks"
import { useState,useContext } from "react"
import { LoginContext } from "../contexts/LoginContext"
import { X } from "lucide-react"

function ModalTask({ isOpen, setOpenModal, categorys, idCategory, loadTasks }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [statusLevel, setStatusLevel] = useState("TODO")
    const [priority, setPriority] = useState("")
    const [errors, setErrors] = useState({});
    const [idCategoryCreate, setIdCategoryCreate] = useState("")

    const {userId} = useContext(LoginContext);


    function handleStatesNull(){
        setName(""),
        setDescription(""),
        setPriority(""),
        setIdCategoryCreate("")
    }

    async function handleCreateTask(e) {
        e.preventDefault()   
    
    const newErrors = {};
    if (!name.trim()) newErrors.name = "O nome é obrigatório.";
    if (!name.trim()) newErrors.name = "O nome é obrigatório.";
    if (!description.trim()) newErrors.description = "A descrição é obrigatória.";
    if (!priority) newErrors.priority = "Escolha uma prioridade.";
    if (!idCategoryCreate) newErrors.idCategoryCreate = "Escolha uma categoria.";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    setErrors({});
    await createTask({
        title: name,
        description: description,
        statusLevel: statusLevel,
        priority: priority,
        idUser: userId,
        idCategory: idCategoryCreate
    })
    await loadTasks(idCategory)
    setOpenModal(false)
    handleStatesNull()
   
    }


    if (isOpen) {
        return (
        <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-[1000] animate-backdrop-in">
            <form
                className="w-[26rem] rounded-2xl shadow-2xl bg-white overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-modal-in bg-zinc-900"
                onSubmit={(e) => handleCreateTask(e)}
            >
                <div className="px-7 py-7">
                    <div className="flex items-center justify-between text-center mb-6">
                        <h2 className="text-xl flex-1 ml-10 font-bold text-indigo-500">
                            Nova tarefa
                        </h2>
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="p-1.5 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-indigo-200 transition-colors duration-150"
                        >
                            <X 
                            size={24} 
                            className="text-indigo-600"
                            onClick={()=>{setErrors({}), handleStatesNull()}}
                             />
                        </button>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-indigo-500">Nome da tarefa</label>
                        <input
                            className="outline-none border border-zinc-300 rounded-lg px-3 py-2 text-sm text-indigo-200 placeholder-zinc-400 w-full mt-1.5 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150"
                            type="text"
                            placeholder="Estudar"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                       {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex gap-4 mt-4">
                        <div className="w-full">
                            <label className="text-sm font-semibold text-indigo-500">Prioridade</label>
                            <select
                                className="outline-none border border-zinc-300 rounded-lg px-3 py-2 text-sm text-indigo-200 w-full mt-1.5 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150 cursor-pointer"
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
                             {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
                           
                        </div>

                
                    </div>

                   

                    <div className="mt-4">
                        <label className="text-sm font-semibold text-indigo-500">Descrição</label>
                        <input
                            className="outline-none border border-zinc-300 rounded-lg px-3 py-2 text-sm text-indigo-200  placeholder-zinc-400 w-full mt-1.5 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150"
                            type="text"
                            placeholder="Terminar o projeto de React"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                         {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                     <ul className="flex flex-wrap items-center  gap-4 mt-6">
                        {categorys.map((category) => (
                            <li key={category.id}>
                                <button
                                    value={idCategoryCreate}
                                    onClick={() => setIdCategoryCreate(category.id)}
                                    type="button"
                                    className={`
                                        px-5 py-2.5
                                        rounded-xl
                                        font-medium
                                        shadow-sm
                                        border
                                        transition-all
                                        duration-200
                                        text-zinc-200
                                        hover:-translate-y-0.5
                                    `}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex gap-3">
                        
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