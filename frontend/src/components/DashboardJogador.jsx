import api from "../services/api"
import { useState } from "react"
import ModalDado from "./ModalDado"
function DashboardJogador(props) {
    const [personagem, setPersonagem] = useState(JSON.parse(localStorage.getItem("personagem")))
    const [mostrarDado, setMostrarDado] = useState(false)
    const [rolada, setRolada] = useState(false)
    const [missaoAtiva, setMissaoAtiva] = useState(true)
    const [mensagemSistema, setMensagemSistema] = useState("")
    async function recebeMissao(){
        const response =
                    await api.post("/missao")
        setMissaoAtiva(response)
    }
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
                                            font-[Rajdhani]
                                            text-xl 
                            ">
                                {
                                    missaoAtiva ? (
                                        <>
                                        <h1 className="mt-8">{"> Missão Principal"}
                                            </h1>
                                            <h1 className="ml-8 font-bold text-green-500 flex items-center gap-2
                                                drop-shadow-[0_0_10px_#86efac]
                                                transition-all
                                                duration-200
                                                animate-pulse" 
                                                >
                                                {props.missao}
                                            </h1 >
                                            <h1>
                                                {"> Descrição"}
                                            </h1>
                                            <h1 className="ml-8 text-lg font-light text-green-300 leading-10">
                                                {props.descricao}
                                            </h1>
                                            <div className="text-center text-lg mt-2 font-[Rajdhani] items-center justify-center">
                                {
                                    !rolada && (
                                            <>
                                            <button
                                                className="
                                            
                                                w-1/4
                                                text-green-500
                                                rounded-2xl
                                                cursor-pointer
                                                font-bold
                                                hover:shadow-[0_0_20px_#22c55e]
                                                border border-green-300
                                                transition-all
                                                "
                                                onClick={() => setMostrarDado(true) 
                                                }
                                                >
                                                        Entrar na Missão
                                                    </button>
                                                    <ModalDado
                                                        aberto={mostrarDado}
                                                        missao={()=>{setMissaoAtiva(false)}}
                                                        setPersonagem={setPersonagem}
                                                        fechar={() => {
                                                                setMostrarDado(false)
                                                                setRolada(true)
                                                                
                                                                }}
                                                    />  
                                                </>
                                            )
                                }
                           
                            </div>

                                        </>
                                    ) : (
                                        <div className="
                                                mt-8
                                                h-full
                                                flex
                                                flex-col
                                                items-center
                                                justify-center
                                                text-center
                                                font-[Orbitron]
                                            ">

                                                <h1 className="
                                                    text-4xl
                                                    text-green-400
                                                    animate-pulse
                                                ">

                                                    AGUARDANDO PRÓXIMA MISSÃO...

                                                </h1>

                                                <p className="
                                                    mt-4
                                                    text-xl
                                                    text-green-300
                                                ">

                                                    O mestre está preparando um novo desafio.

                                                </p>

                                            </div>
                                    )
                                }

      </div>                            
        </div>
    )
}

export default DashboardJogador