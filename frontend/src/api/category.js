export async function getCategorys() {
    const token = localStorage.getItem("token")

    const response = await fetch("http://localhost:8080/categorys", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Erro ao buscar categorias.")
    }

    return response.json()
}

export async function getTasksByCategory(id) {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:8080/categorys/${id}/tasks`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Erro ao buscar tarefas da categoria.")
    }

    return response.json()
}
export async function createCategory(category) {
    const token = localStorage.getItem("token")

    await fetch("http://localhost:8080/categorys",{
        method:"POST",

        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(category)
    })
}

export async function deleteCategory(id) {
    const token = localStorage.getItem("token")
    await fetch(
        `http://localhost:8080/categorys/${id}`,
        {
            method:"DELETE",
            headers: {
            "Authorization": `Bearer ${token}`
        }
        }
    )
}