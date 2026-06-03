import { useEffect, useState } from "react"
import api from "../services/api"
import FichaPersonagem from "../components/FichaPersonagem"
import DashboardJogador from "../components/DashboardJogador"
import TerminalChat from "../components/TerminalChat"
function Jogador() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    )
    const usuarioPersonagem = JSON.parse(localStorage.getItem("personagem")
    )
    const usuarioMissao = JSON.parse(localStorage.getItem("missao"))


    return (
        <div className="min-h-screen items-center justify-center bg-black flex-col flex">

            <div className="bg-black text-cyan-400 flex items-start justify-center text-4xl gap-8 mt-8">
                
                <FichaPersonagem
                    nome={usuarioPersonagem.nome_personagem}
                    classe={usuarioPersonagem.classe}
                    personagem={usuarioPersonagem}
                    level={usuario.nivel}
                    xp={usuario.xp}
                />

                <DashboardJogador/>

                <TerminalChat personagem={usuarioPersonagem.nome_personagem} missao={usuarioMissao} usuario={usuario}/>

            </div>

        </div>
    )
}

export default Jogador