import { useState,useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { X } from "lucide-react";


function ModalCategory({ OpenModal, setOpenModal, createCategory }) {

    const [nameCategory, setNameCategory] = useState("")
    const [emojiCategory, setEmojiCategory] = useState("")
    const [descriptionCategory, setDescriptionCategory] = useState("")
    const [error, setError] = useState("");
    
    const {userId} = useContext(LoginContext)

    function setStatesNull(){
        setNameCategory(""),
        setEmojiCategory(""),
        setDescriptionCategory("")
    }

    if (OpenModal) {
        return (
            <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-[1000] animate-backdrop-in">
                <form
                    className="w-96 rounded-2xl shadow-2xl bg-zinc-900 overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-modal-in"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!nameCategory.trim()) {
                                setError("nome é obrigatório.");
                                return;
                            }
                        setError("");
                        createCategory(nameCategory, emojiCategory, descriptionCategory, userId);
                        setStatesNull();
                        setOpenModal(false);
                    }}
                    >
                    <div className="px-7 py-7">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl flex-1
                            text-center ml-8 font-bold text-indigo-500">
                                Nova categoria
                            </h2>
                            <button
                                type="button"
                                onClick={() => setOpenModal(false)}
                                className="p-1.5 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-indigo-200 transition-colors duration-150"
                            >
                                <X 
                                size={24} className="text-indigo-500"
                                onClick={()=> {setError("")}} />
                            </button>
                        </div>

                        <div className="flex gap-4">
                           
                            <div className="flex-1">
                                <label className="text-sm font-semibold text-indigo-500">Nome</label>
                                <input
                                    className="outline-none border border-zinc-300 rounded-lg px-3 py-2 text-sm text-indigo-200 placeholder-zinc-400 w-full mt-1.5 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150"
                                    type="text"
                                    placeholder="Academia"
                                    value={nameCategory}
                                    onChange={(e) => setNameCategory(e.target.value)} />
                                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                            </div>
                             <div className="w-20">
                                <label className="text-sm font-semibold text-indigo-500">Emoji</label>
                                <input
                                    className="outline-none border border-zinc-300 rounded-lg px-3 py-1 text-lg text-center text-indigo-200  w-full mt-1.5 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150"
                                    type="text"
                                    placeholder="🔥"
                                    value={emojiCategory}
                                    onChange={(e) => setEmojiCategory(e.target.value)} />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="text-sm font-semibold text-indigo-500">Descrição</label>
                            <textarea
                                className="outline-none border border-zinc-300 rounded-lg px-3 py-2 text-sm text-indigo-200  placeholder-zinc-400 w-full mt-1.5 min-h-20 resize-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-150"
                                placeholder="Projeto de 60 dias..."
                                value={descriptionCategory}
                                onChange={(e) => setDescriptionCategory(e.target.value)} />
                        </div>

                        <div className="mt-8 flex gap-3">
                        

                            <button
                                className="flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-150"
                                type="submit"
                            >
                                Criar categoria
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    return null
}

export default ModalCategory;