function Header() {
    const hour = new Date().getHours()
    const greeting =
        hour < 12 ? "Bom dia" :
        hour < 18 ? "Boa tarde" :
        "Boa noite"

    return (
        <div className="space-y-3">
            <h1 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
                </span>
                {greeting}, bem vindo de volta!
            </h1>

            <h2 className="text-5xl font-extrabold tracking-tight text-zinc-950">
                Minhas <span className="text-indigo-600">tarefas</span>
            </h2>

            <div className="h-1 w-12 rounded-full bg-indigo-500" />
        </div>
    )
}

export default Header