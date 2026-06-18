import {useState} from "react";

function ModalCategory({OpenModal,setOpenModal,createCategory}) {

        const [nameCategory, setNameCategory] = useState("")
        const [emojiCategory, setEmojiCategory] = useState("emoji")
        const [descriptionCategory, setDescriptionCategory] = useState("")
        const [idUser, setIdUser] = useState(10)
      
        if(OpenModal){
            return(
               <div className="fixed inset-0 bg-zinc-950/70 z-[1000]">
                
                   <form className="w-120 rounded-lg shadow h-auto px-6 py-12 bg-zinc-50 overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onSubmit={(e) => {
                       e.preventDefault();
                       createCategory(nameCategory,emojiCategory,descriptionCategory,idUser);
                       setOpenModal(false);
                   }}>
                    <h2 class="text-2xl font-medium text-zinc-900 text-center">New Category</h2>
                     
                    <div className="mt-3">
                        <label className="text-zinc-900">Nome:</label>
                        <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-zinc-900 w-full focus:border-teal-600"
                        type="text"
                        placeholder="Academia"
                        value={nameCategory}
                        onChange={(e) => setNameCategory(e.target.value)} />
                    </div>
                    <div className="mt-3">
                        <label className="text-zinc-900">Emoji:</label>
                        <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-zinc-900 w-full focus:border-teal-600"
                        type="text"
                        placeholder="Emoji"
                        value={emojiCategory}
                        onChange={(e) => setEmojiCategory(e.target.value)} />
                    </div>
                     <div className="mt-3">
                        <label className="text-zinc-900">Descrição:</label>
                        <textarea
                        className="outline-none border-2 rounded-md px-2 py-1 text-zinc-900 w-full focus:border-teal-600"
                        type="text"
                        placeholder="Projeto de 60 dias..."
                        value={descriptionCategory}
                        onChange={(e) => setDescriptionCategory(e.target.value)} />
                    </div>
                    <div className="mt-12 flex justify-around">
                        <button className="bg-teal-700 text-white px-16 py-2 rounded hover:bg-teal-600" type="submit">Criar</button>
                        <button 
                        type="button"
                        className="bg-zinc-900 text-white px-15 py-2 rounded hover:bg-zinc-700"
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
