import { useState } from "react"
import Modal from "./Modal.jsx"

function CreateTasks({categorys,idCategory,loadTasks}) {

    const [openModal,setOpenModal] = useState(false)

    return(
        <>
        <Modal categorys={categorys} idCategory={idCategory} isOpen={openModal} loadTasks={loadTasks}></Modal>
        <button className="bg-amber-300" onClick={() => setOpenModal(!openModal)}>Adicionar Task</button>        
        </>
    )
}

export default CreateTasks
