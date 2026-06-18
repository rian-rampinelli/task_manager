import {useState} from "react";

function ModalCategory({OpenModal,setOpenModal,createCategory}) {

        const [nameCategory, setNameCategory] = useState("")
        const [emojiCategory, setEmojiCategory] = useState("emoji")
        const [descriptionCategory, setDescriptionCategory] = useState("")
        const [idUser, setIdUser] = useState(10)
      
        if(OpenModal){
            return(
               <div className="fixed inset-0 bg-zinc-950/60 z-[1000]">
                
                   <form
                        className="w-96 rounded-2xl shadow-xl px-6 py-10 bg-white overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            createCategory(nameCategory,emojiCategory,descriptionCategory,idUser);
                            setOpenModal(false);
                        }}
                   >
                    
                    <h2 className="text-2xl font-semibold text-zinc-900 text-center">
                        Nova Categoria
                    </h2>
                     
                    <div className="mt-4">
                        <label className="text-zinc-700 text-sm">Nome:</label>
                        <input
                        className="outline-none border border-zinc-200 rounded-lg px-3 py-2 text-zinc-900 w-full mt-1 focus:border-zinc-400"
                        type="text"
                        placeholder="Academia"
                        value={nameCategory}
                        onChange={(e) => setNameCategory(e.target.value)} />
                    </div>

                    <div className="mt-4">
                        <label className="text-zinc-700 text-sm">Emoji:</label>
                        <input
                        className="outline-none border border-zinc-200 rounded-lg px-3 py-2 text-zinc-900 w-full mt-1 focus:border-zinc-400"
                        type="text"
                        placeholder="🔥"
                        value={emojiCategory}
                        onChange={(e) => setEmojiCategory(e.target.value)} />
                    </div>

                    <div className="mt-4">
                        <label className="text-zinc-700 text-sm">Descrição:</label>
                        <textarea
                        className="outline-none border border-zinc-200 rounded-lg px-3 py-2 text-zinc-900 w-full mt-1 focus:border-zinc-400"
                        placeholder="Projeto de 60 dias..."
                        value={descriptionCategory}
                        onChange={(e) => setDescriptionCategory(e.target.value)} />
                    </div>

                    <div className="mt-8 flex justify-around gap-3">
                        <button
                            className="bg-zinc-900 text-white px-12 py-2 rounded-xl hover:bg-zinc-500 transition"
                            type="submit"
                        >
                            Criar
                        </button>

                        <button 
                            type="button"
                            className="bg-zinc-300 text-zinc-900 px-12 py-2 rounded-xl hover:bg-zinc-500 transition"
                            onClick={() => setOpenModal(false)}
                        >
                            Fechar
                        </button>
                    </div>

                    </form>
               </div>
            )
        }
        return null
}

export default ModalCategory;