export async function getCategorys() {
    const response =
        await fetch("http://localhost:8080/categorys")

    return response.json()
}

export async function getTasksByCategory(id) {

    const response =
        await fetch(`http://localhost:8080/categorys/${id}/tasks`)

    return response.json()
}

export async function createCategory(category) {

    await fetch("http://localhost:8080/categorys",{
        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(category)
    })
}

export async function deleteCategory(id) {

    await fetch(
        `http://localhost:8080/categorys/${id}`,
        {
            method:"DELETE"
        }
    )
}