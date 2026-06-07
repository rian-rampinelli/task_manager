function Categorias({categorias,createCategory,deleteCategory}){

    return(
    <>
    <p className="mt-12 text-xl font-semibold" >
        categorias
    </p>
    
    <ul className="flex gap-5">
        {categorias.map(category =>(
            <li  key={category.id}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {category.name}
                </button>
                <button onClick={() => deleteCategory(category.id)}>Lixo</button>
            </li>
        ))}
         <button className="bg-gray-200 rounded-4xl py-2 px-4" onClick={() => createCategory()}>+</button>
    </ul>
   
    </>
    )
}

export default Categorias
