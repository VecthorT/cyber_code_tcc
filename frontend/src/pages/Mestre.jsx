import { useEffect, useState } from "react"
import api from "../services/api"
import FichaPersonagem from "../components/FichaPersonagem"
import DashboardJogador from "../components/DashboardJogador"
import TerminalChat from "../components/TerminalChat"
import DashboardMestre from "../components/DashboardMestre"
function Jogador() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    )

    return (
        <div className="min-h-screen items-center justify-center bg-black flex-col flex">

            <div className="bg-black text-cyan-400 flex items-start justify-center text-4xl gap-8 mt-8">

                <DashboardMestre></DashboardMestre>
                <TerminalChat personagem={usuario.usuario} usuario={usuario}/>
            </div>

        </div>
    )
}

export default Jogador