function Footer(){
    const currentYear = new Date().getFullYear()

    return(
        <footer className="mt-12 w-full rounded-t-2xl border border-slate-200 bg-slate-900 px-8 py-5 shadow-sm">
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-100 md:flex-row md:items-center md:justify-between">
                <p>Desenvolvido por Rian Rampinelli</p>
                <p className="text-slate-300">&copy; {currentYear} Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer
