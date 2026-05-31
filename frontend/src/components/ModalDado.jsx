import { useEffect, useState } from "react"
import BotaoResposta from "./BotaoResposta"
function ModalDado({ aberto, fechar, missao, setPersonagem}) {

    const infoMissao = JSON.parse(localStorage.getItem("missao"))
    const [valorDado, setValorDado] = useState(1)
    const [rolando, setRolando] = useState(false)
    const [consequenciaDado, setResultadoDado] = useState({})
    const [mostrarResultado, setMostrarResultado] = useState(false)
    const [mensagemResultado, setMensagemResultado] = useState("")
    function pegarResultadoDado(valor, resultadoDado){
        if(valor == 20){

                return resultadoDado["20"]

            }

            else if(valor >= 15){

                return resultadoDado["15-19"]

            }

            else if(valor >= 10){

                return resultadoDado["10-14"]

            }

            else if(valor >= 5){

                return resultadoDado["5-9"]

            }

            else{

                return resultadoDado["1-4"]

            }

        }
    function rolarDado() {

        setRolando(true)

        let contador = 0

        const intervalo = setInterval(() => {

            const numero = Math.floor(Math.random() * 20) + 1

            setValorDado(numero)
            
            contador++
            
            if (contador >= 20) {
                
                clearInterval(intervalo)
                
                setRolando(false)
                setResultadoDado(pegarResultadoDado(numero,infoMissao.resultado_dado))
            }

        }, 100)

    }
    function salvarDados() {

    }

    useEffect(() => {

        if (aberto) {

            rolarDado()
        }

    }, [aberto])

    if (!aberto) return null

    function responderMissao(respostaJogador){
        const personagem = JSON.parse(
            localStorage.getItem("personagem")
        )
        
        const acertou =
            respostaJogador == infoMissao.resposta

        if(acertou){

            personagem.xp +=
                infoMissao.ganho_xp

            if(consequenciaDado.bonus_xp){

                personagem.xp +=
                    consequenciaDado.bonus_xp
            }

            setMensagemResultado(
                "✅ MISSÃO CONCLUÍDA"
            )

        }else{

            if(
                consequenciaDado.tipo_penalidade == "xp"
            ){

                personagem.xp -=
                    consequenciaDado.penalidade

            }else{

                personagem.atributos[
                    consequenciaDado.tipo_penalidade
                ] -= consequenciaDado.penalidade

            }

            setMensagemResultado(
                "☠ ACESSO NEGADO"
            )

        }

        localStorage.setItem(
            "personagem",
            JSON.stringify(personagem)
        )

        setPersonagem(personagem)

        setMostrarResultado(true)
        
        setTimeout(() => {
            
            setMostrarResultado(false)
        }, 2500)

    }
    return (
        
        <div className="flex">

            <div className="
                fixed
                inset-0
                bg-black/80
                flex
                items-center
                justify-center
                z-40
                gap-2
            ">
                    {
                    mostrarResultado && (

                        <div className="
                            fixed
                            inset-0
                            bg-black/90
                            flex
                            items-center
                            justify-center
                            z-50
                        ">

                            <div className="
                                bg-black
                                border-2
                                border-cyan-400
                                rounded-4xl
                                p-10
                                text-center
                                shadow-[0_0_40px_#22d3ee]
                                animate-pulse
                            ">

                                <h1 className="
                                    text-4xl
                                    font-[Orbitron]
                                    text-cyan-400
                                    mb-4
                                ">

                                    {mensagemResultado}

                                </h1>

                            </div>

                        </div>

                    )
                }
                <div className="
                    w-96
                    h-96
                    bg-black
                    border-2
                    border-cyan-400
                    rounded-4xl
                    flex
                    flex-col
                    items-center
                    justify-center
                    shadow-[0_0_40px_#22d3ee]
                    relative
                ">

                    <h1 className="
                        text-cyan-400
                        text-3xl
                        mb-6
                        font-[Orbitron]
                    ">
                        D20 SYSTEM
                    </h1>

                    <div className={`
                        w-40
                        h-40
                        rounded-3xl
                        border-2
                        flex
                        items-center
                        justify-center
                        text-8xl
                        font-bold
                        transition-all
                        duration-200

                        ${valorDado === 20
                            ? "border-yellow-400 text-yellow-400 shadow-[0_0_40px_gold]"
                            : valorDado === 1
                                ? "border-red-500 text-red-500 shadow-[0_0_40px_red]"
                                : "border-cyan-400 text-cyan-400 shadow-[0_0_30px_#22d3ee]"
                        }

                        ${rolando ? "animate-pulse scale-110" : ""}
                    `}>

                        {valorDado}

                    </div>

                    <div className="mt-4">

                        {
                           !rolando && (
                                <div className="text-green-400 text-sm">
                                    <p>
                                        {consequenciaDado.mensagem}
                                    </p>

                                    {
                                        consequenciaDado.bonus_xp !== undefined && (
                                            <p className="text-cyan-400 font-bold">
                                                +{consequenciaDado.bonus_xp} XP
                                            </p>
                                        )
                                    }
                                    {
                                        consequenciaDado.penalidade !== undefined && (
                                            <p className="text-red-500 font-bold">
                                                -{consequenciaDado.penalidade} {consequenciaDado.tipo_penalidade}
                                            </p>
                                        )
                                    }

                                </div>
                            )
                        }

                    </div>

                    <div className="flex gap-4 mt-2">

                        <button
                            onClick={fechar, missao}
                            
                            className="
                                px-4
                                py-2
                                border
                                border-red-500
                                rounded-xl
                                text-red-500
                                hover:bg-red-500
                                hover:text-black
                                transition-all
                                cursor-pointer
                            "
                        >

                            Fechar

                        </button>

                    </div>

                </div>
               <div className="
                    w-150
                    h-96
                    bg-black
                    border-2
                    border-cyan-400
                    rounded-4xl
                    flex
                    flex-col
                    items-center
                    justify-center
                    shadow-[0_0_40px_#22d3ee]
                    relative
                ">
                <h1 className="text-cyan-500 text-2xl text-center whitespace-pre-line">
                    {infoMissao.conteudo}
                </h1>
                    <div className="flex gap-3.5 mt-3">
                    {
                        !rolando && (
                            <div className="flex gap-3.5 mt-3">

                                <BotaoResposta
                                    nome="A"
                                    responder={responderMissao}
                                />

                                <BotaoResposta
                                    nome="B"
                                    responder={responderMissao}
                                />

                                <BotaoResposta
                                    nome="C"
                                    responder={responderMissao}
                                />

                                <BotaoResposta
                                    nome="D"
                                    responder={responderMissao}
                                />

                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ModalDado