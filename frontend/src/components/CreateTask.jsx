import { useState } from "react"
import ModalTask from "./ModalTask.jsx"

function CreateTasks({categorys,idCategory,loadTasks}) {

    const [openModal,setOpenModal] = useState(false)

    return(
        <>
        <ModalTask categorys={categorys} idCategory={idCategory} isOpen={openModal} loadTasks={loadTasks}></ModalTask>
        <button className="bg-amber-300" onClick={() => setOpenModal(!openModal)}>Adicionar Task</button>        
        </>
    )
}

export default CreateTasks
