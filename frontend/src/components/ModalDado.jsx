import { useEffect, useState } from "react"
import BotaoResposta from "./BotaoResposta"
import api from "../services/api"
function ModalDado({
                aberto,
                fechar,
                missao,
                setPersonagem,
                setMissaoAtiva
            })
 {

    const infoMissao = missao
    const [valorDado, setValorDado] = useState(1)
    const [rolando, setRolando] = useState(false)
    const [consequenciaDado, setResultadoDado] = useState({})
    const [mostrarResultado, setMostrarResultado] = useState(false)
    const [mensagemResultado, setMensagemResultado] = useState("")
    const [missaoFinalizada, setMissaoFinalizada] = useState(false)
    const [resultadoFinal, setResultadoFinal] = useState(null)
    
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
            }
        }, 100)
    }
    function salvarDados() {

    }
    function gerarConsequencia(valorDado, acertou, missao) {
        const baseXp = missao.xp_base

        // CRÍTICO
        if (valorDado === 20) {
            return {
                mensagem: "🔥 CRÍTICO ABSOLUTO",
                bonus_xp: baseXp * 0.5,
                penalidade: 0
            }
        }

        // FALHA CRÍTICA
        if (valorDado === 1) {
            return {
                mensagem: "💀 FALHA CRÍTICA",
                bonus_xp: 0,
                penalidade: acertou ? baseXp * 0.3 : baseXp * 0.5,
                tipo_penalidade: "xp"
            }
        }

        // SUCESSO NORMAL
        if (acertou) {
            if (valorDado >= 15) {
                return {
                    mensagem: "⚡ SUCESSO LIMPO",
                    bonus_xp: baseXp * 0.25,
                    penalidade: 0
                }
            }

            if (valorDado >= 10) {
                return {
                    mensagem: "✔ SUCESSO",
                    bonus_xp: baseXp * 0.1,
                    penalidade: 0
                }
            }

            return {
                mensagem: "✔ SUCESSO FRACO",
                bonus_xp: 0,
                penalidade: 0
            }
        }

        // ERRO NORMAL
        return {
            mensagem: "❌ FALHA",
            bonus_xp: 0,
            penalidade: baseXp * 0.2,
                tipo_penalidade: "xp"
            }
        }

    useEffect(() => {

        if (aberto) {

            rolarDado()
        }

    }, [aberto])

    if (!aberto) return null
    function responderMissao(respostaJogador) {
        const personagem = JSON.parse(localStorage.getItem("personagem"))

        const acertou = respostaJogador === infoMissao.resposta

        const consequencia = gerarConsequencia(
            valorDado,
            acertou,
            infoMissao
        )

        setResultadoDado(consequencia)

        setResultadoFinal({
            acertou,
            consequencia
        })

        setMensagemResultado(
            acertou ? "✅ MISSÃO CONCLUÍDA" : "☠ ACESSO NEGADO"
        )

        setMostrarResultado(true)

        setTimeout(() => {
            setMostrarResultado(false)
        }, 2000)
        setMissaoFinalizada(true)
    }
    async function fecharModal() {

        if (missaoFinalizada && resultadoFinal) {

            const usuario =
                JSON.parse(
                    localStorage.getItem("usuario")
                )

            const personagem =
                JSON.parse(
                    localStorage.getItem("personagem")
                )

            const { acertou, consequencia } =
                resultadoFinal

            if (acertou) {

                personagem.xp +=
                    infoMissao.ganho_xp +
                    (consequencia.bonus_xp || 0)

            } else {

                if (
                    consequencia.tipo_penalidade === "xp"
                ) {

                    personagem.xp -=
                        consequencia.penalidade || 0

                } else {

                    personagem.atributos[
                        consequencia.tipo_penalidade
                    ] -= consequencia.penalidade
                }
            }

            await api.patch(
                `/personagens/${personagem.id}`,
                personagem
            )

            const usuarioResp =
                await api.get(
                    `/usuarios/${usuario.id}`
                )

            const kanban =
                usuarioResp.data.kanban

            if (acertou) {

                kanban.sprint =
                    kanban.sprint.filter(
                        id =>
                            Number(id) !==
                            Number(infoMissao.id)
                    )

                if (
                    !kanban.concluido.includes(
                        Number(infoMissao.id)
                    )
                ) {

                    kanban.concluido.push(
                        Number(infoMissao.id)
                    )
                }
            }

            await api.patch(
                `/usuarios/${usuario.id}`,
                { kanban }
            )

            localStorage.setItem(
                "personagem",
                JSON.stringify(personagem)
            )

            setPersonagem(personagem)

            if (acertou) {

                setMissaoAtiva(null)
            }
    }

    setMissaoFinalizada(false)
    setResultadoFinal(null)
    setMostrarResultado(false)

    fechar()
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
                                        {resultadoFinal?.consequencia?.mensagem}
                                    </p>

                                    {resultadoFinal?.consequencia?.bonus_xp && (
                                        <p className="text-cyan-400 font-bold">
                                            +{resultadoFinal.consequencia.bonus_xp} XP
                                        </p>
                                    )}

                                    {resultadoFinal?.consequencia?.penalidade && (
                                        <p className="text-red-500 font-bold">
                                            -{resultadoFinal.consequencia.penalidade}
                                        </p>
                                    )}

                                </div>
                            )
                        }

                    </div>

                    <div className="flex gap-4 mt-2">

                        <button
                            onClick={fecharModal}
                            
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