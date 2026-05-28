import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }){

    const usuarioSalvo = localStorage.getItem("usuario")
    const tipo = localStorage.getItem("tipo")
    console.log(usuarioSalvo)
    if(!usuarioSalvo){
        return <Navigate to="/"/>
        console.log("Tste")
    }
    else if(tipo == "mestre"){
        return <Navigate to="/mestre"/>
    }
    else if(tipo == "jogador"){
        return <Navigate TO="/personagem"/>
    }
    return children
}

export default ProtectedRoute