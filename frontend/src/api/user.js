export async function login(email, password) {
    const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email,
        passWord:password
    })
});

    if (!response.ok) {
        throw new Error("Email ou senha inválidos.");
    }

    return await response.json();
}


export async function register(name,email, password) {
    const response = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name,
        email,
        passWord:password
    })
});

    if (!response.ok) {
        throw new Error("Email ou senha inválidos.");
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}