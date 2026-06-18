function Footer(){
    const currentYear = new Date().getFullYear()

    return(
        <footer className="mt-12 w-full rounded-t-2xl border border-zinc-800 bg-zinc-950 px-8 py-5 shadow-sm">
            <div className="flex flex-col gap-2 text-sm font-medium text-zinc-100 md:flex-row md:items-center md:justify-between">
                <p>Desenvolvido por Rian Rampinelli</p>
                <p>&copy; {currentYear} Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer
