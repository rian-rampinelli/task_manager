import { useState } from "react"

import Modal from "./Modal.jsx"



function CreateTasks({categorys,idCategory}) {

    const [openModal,setOpenModal] = useState(false)

    return(
        <>
        <Modal categorys={categorys} idCategory={idCategory} isOpen={openModal}></Modal>
        <button className="bg-amber-300" onClick={() => setOpenModal(!openModal)}>Adicionar Task</button>        
        </>
    )
}

export default CreateTasks
