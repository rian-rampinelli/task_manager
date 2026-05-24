import { useEffect, useState } from "react"

function Categorias(){

    const [categorys,setCategorys] = useState([])

     useEffect(() => {
    
            fetch('http://localhost:8080/categorys')
                .then(response => response.json())
                .then(data => setCategorys(data))
                .catch(error => console.log(error))
    
        }, [])

    return(
    <>
    <p>
        categorias
    </p>
    <ul>
        {categorys.map(category =>(
            <li key={category.id}>
                {category.name}
            </li>
        ))}
    </ul>
    </>
    )
}

export default Categorias