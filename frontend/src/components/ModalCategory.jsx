import {useState} from "react";

function ModalCategory({OpenModal,setOpenModal,createCategory}) {

        const [nameCategory, setNameCategory] = useState("")
        const [emojiCategory, setEmojiCategory] = useState("emoji")
        const [descriptionCategory, setDescriptionCategory] = useState("")
        const [idUser, setIdUser] = useState(10)
      
        if(OpenModal){
            return(
               <div className="fixed inset-0 bg-black/80 z-[1000]">
                
                   <form className="w-120 rounded-lg shadow h-auto px-6 py-12 bg-white overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onSubmit={(e) => {
                       e.preventDefault();
                       createCategory(nameCategory,emojiCategory,descriptionCategory,idUser);
                       setOpenModal(false);
                   }}>
                    <h2 class="text-2xl font-medium text-slate-700 text-center">New Category</h2>
                     
                    <div className="mt-3">
                        <label className="text-slate-500">Nome da categoria:</label>
                        <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                        type="text"
                        placeholder="Estudar"
                        value={nameCategory}
                        onChange={(e) => setNameCategory(e.target.value)} />
                    </div>
                    <div className="mt-3">
                        <label className="text-slate-500">Emoji:</label>
                        <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                        type="text"
                        placeholder="emoji"
                        value={emojiCategory}
                        onChange={(e) => setEmojiCategory(e.target.value)} />
                    </div>
                     <div className="mt-3">
                        <label className="text-slate-500">Descrição:</label>
                        <textarea
                        className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                        type="text"
                        placeholder="Terminar o projeto de React"
                        value={descriptionCategory}
                        onChange={(e) => setDescriptionCategory(e.target.value)} />
                    </div>
                    <div className="mt-12 flex justify-around">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Adicionar Category</button>
                        <button 
                        type="button"
                        className="bg-gray-500 text-white px-15 py-2 rounded hover:bg-gray-300"
                        onClick={() => setOpenModal(false)}
                        >Fechar</button>
                    </div>
                    </form>
               </div>
            )
        }
        return null
}

export default ModalCategory;