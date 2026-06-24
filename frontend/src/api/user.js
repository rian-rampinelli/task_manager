export async function getTasksByUser(id) {
    
    const response =
        await fetch(`http://localhost:8080/user/${id}/tasks`)

    return response.json()
}