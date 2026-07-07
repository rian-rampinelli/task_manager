import { Link } from "react-router-dom";

export function NotFound(){
    return (
        <div className="text-center">
            <p className="text-white mb-10"><span className="text-3xl font-bold">404</span> - How did we get here?</p>
            <Link to={"/home"} class="mt-5
                    px-4 py-3
                    rounded-xl
                    bg-indigo-500
                    text-zinc-200
                    font-semibold
                    tracking-wide
                    shadow-md shadow-indigo-600/20
                    transition-all duration-300
                    hover:bg-indigo-700
                    hover:shadow-lg hover:shadow-indigo-600/25
                    hover:-translate-y-0.5
                    active:translate-y-0 active:scale-95" type="button">Bring me home!</Link>
        </div>
    )
}