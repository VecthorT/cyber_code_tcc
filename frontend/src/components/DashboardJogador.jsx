import api from "../services/api"
import { useState } from "react"
import ModalDado from "./ModalDado"
function DashboardJogador(props) {
    const personagem = JSON.parse(localStorage.getItem("personagem"))
    const [mostrarDado, setMostrarDado] = useState(false)
    const [rolada, setRolada] = useState(false)
    return (
        <div className="w-150
                        h-120
                        p-2
                        bg-black
                        border-green-500
                        border-2
                        rounded-4xl
                        shadow-[0_0_2px_#03A062]
                        hover:shadow-[0_0_20px_#03A062]
                        transition-all
                        duration-200
                        relative
                        text-green-400
                        ">
                            <div className="absolute
                                            left-1/2
                                            -translate-x-1/2
                                            -top-3
                                            w-80
                                            h-8
                                            rounded-2xl
                                            bg-black
                                            text-center">
                                <h1 className="font-[Orbitron] font-medium text-xl tracking-widest">PAINEL DE CONTROLE</h1>
                            </div>
                            <div className="
                                            pl-2
                                            pt-2
                                            font-[Rajdhani]
                                            text-xl
                            ">
                                <h1>{"> Missão Principal"}
                                </h1>
                                <h1 className="ml-8 font-bold text-green-300">
                                    {props.missao}
                                </h1 >
                                <h1>
                                    {"> Descrição"}
                                </h1>
                                <h1 className="ml-8 text-lg font-light text-green-300">
                                    {props.descricao}
                                </h1>
                                <h1 className="text-red-600">
                                    {"> Desafio"}
                                </h1>
                                <h1 className="ml-8 font-light text-red-600">
                                    {props.desafio}
                                </h1>
                                <input className="w-full mt-2 text-center bg-black border-2 rounded-2xl" placeholder="Digite sua resposta"/>
                            </div>
                            <div className="text-center text-lg mt-2 font-[Rajdhani] flex items-center justify-center">
                                {
                                    !rolada && (
                                        <>
                                        <button
                                            className="
                                            bg-green-400 w-1/4
                                            text-black
                                            rounded-2xl
                                            cursor-pointer
                                            font-bold
                                            hover:scale-105
                                            transition-all
                                            "
                                            onClick={() => setMostrarDado(true) }
                                            >
                                                Rolar D20
                                            </button>
                                            <ModalDado
                                                aberto={mostrarDado}
                                                fechar={() => {
                                                        setMostrarDado(false)
                                                        setRolada(true)
                                                        }}
                                            />
                                                                </>
                                                        )
                                }
                                <button className="bg-green-400 w-1/4
                                                   text-black
                                                   rounded-2xl
                                                   cursor-pointer
                                                   font-bold
                                                   hover:scale-105
                                                   transition-all">Resposta</button>
                            </div>

        </div>
    )
}

export default DashboardJogador