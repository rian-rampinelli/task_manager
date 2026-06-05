function Categorias({deleteCategory,categorias,createCategory}){

    return(
    <>
    <p className="mt-12 text-xl font-semibold" >
        categorias
    </p>
    <button onClick={() => createCategory()}>Criar Categoria</button>
    <ul>
        {categorias.map(category =>(
            <li key={category.id}>
                {category.name}
                <button onClick={() => deleteCategory(category.id)}>excluir</button>
            </li>
        ))}
    </ul>
    </>
    )
}

export default Categorias
