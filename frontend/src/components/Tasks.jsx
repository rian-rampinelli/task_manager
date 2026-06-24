import { useEffect } from "react"
import { Check, Trash2, Pencil } from "lucide-react"
import { updateTaskPartial, deleteTask } from "../api/tasks.js"

function Tasks({ idCategory, loadTasks, tasks }) {

    async function handleUpdateTaskPartial(task) {
        await updateTaskPartial(task.id, { statusLevel: "DONE" })
        await loadTasks(idCategory)
    }

    async function handleDeleteTask(id) {
        await deleteTask(id)
        await loadTasks(idCategory)
    }

    useEffect(() => {
        loadTasks(idCategory)
    }, [idCategory])

    const priorityColors = {
        HIGH: "bg-red-100 text-red-700",
        MEDIUM: "bg-amber-100 text-amber-700",
        LOW: "bg-emerald-100 text-emerald-700",
    }

    const priorityBorderColors = {
        HIGH: "border-l-red-500",
        MEDIUM: "border-l-amber-500",
        LOW: "border-l-emerald-500",
    }

    if (tasks.length > 0) {
        return (
            <ul className="flex flex-col gap-4 mt-8">
                {tasks.map(task => (
                    <li key={task.id}>
                        <div className={`group border border-zinc-200 ${priorityBorderColors[task.priority] || "border-l-zinc-300"} border-l-4 rounded-xl p-5 flex justify-between items-start shadow-sm hover:shadow-md transition-shadow bg-white`}>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleUpdateTaskPartial(task)}
                                    className="shrink-0 w-9 h-9 flex items-center justify-center border-2 rounded-full border-zinc-300 text-zinc-300 hover:border-green-500 hover:text-green-500 hover:bg-green-50 transition"
                                >
                                    <Check size={18} strokeWidth={3} />
                                </button>

                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                        {task.category.name || "Categoria não especificada"}
                                    </span>
                                    <p className="font-semibold text-zinc-900 leading-snug">{task.title}</p>
                                    {task.description && (
                                        <p className="text-sm text-zinc-500">{task.description}</p>
                                    )}
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                                            {task.statusLevel}
                                        </span>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[task.priority] || "bg-zinc-100 text-zinc-600"}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center  gap-1">
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    title="Delete task"
                                    className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition"
                                >
                                    <Trash2 size={20} />
                                </button>
                                <button 
                                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
                                title="Editar task">
                                    <Pencil size={20} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center mt-30">
            <h1 className="text-indigo-500 font-semibold text-2xl">Sem tasks por enquanto!</h1>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-200">
                Adicione uma nova task para começar
            </p>
        </div>
    )
}

export default Tasks;