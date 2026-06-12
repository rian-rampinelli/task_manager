import {useState} from "react";

function ModalCategory({isOpen,createCategory}) {

        const [nameCategory, setNameCategory] = useState("")
        const [emojiCategory, setEmojiCategory] = useState("emoji")
        const [descriptionCategory, setDescriptionCategory] = useState("")
        const [idUser, setIdUser] = useState(10)
      
        if(isOpen){
            return(
               <form onSubmit={(e) => {
                   e.preventDefault();
                   createCategory(nameCategory,emojiCategory,descriptionCategory,idUser);
               }}>
                 <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Adicionar Category</button>
            
                <div>
                    <label>Nome da categoria:</label>
                    <input
                    type="text"
                    placeholder="Estudar"
                    value={nameCategory}
                    onChange={(e) => setNameCategory(e.target.value)} />
                </div>
                <div>
                    <label>Emoji:</label>
                    <input
                    type="text"
                    placeholder="emoji"
                    value={emojiCategory}
                    onChange={(e) => setEmojiCategory(e.target.value)} />
                </div>
                 <div>
                    <label>Descrição:</label>
                    <input
                    type="text"
                    placeholder="Terminar o projeto de React"
                    value={descriptionCategory}
                    onChange={(e) => setDescriptionCategory(e.target.value)} />
                </div>
            </form>
            )
        }
        return null
}

export default ModalCategory;