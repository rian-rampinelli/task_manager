import {createContext,useState } from "react";

export const LoginContext = createContext()

export const LoginProvider = ({children})=>{
    
    const [userId,setIdUser] = useState(10)

    return (
        <LoginContext.Provider value={{userId,setIdUser}}>
            {children}
        </LoginContext.Provider>
    )
}