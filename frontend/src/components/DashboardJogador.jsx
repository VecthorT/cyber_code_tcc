import { useEffect, useState } from "react"
import api from "../services/api"
import ModalDado from "./ModalDado"

function DashboardJogador() {

    const [personagem, setPersonagem] = useState(
        JSON.parse(localStorage.getItem("personagem"))
    )

    const [missoesSprint, setMissoesSprint] = useState([])
    const [missaoAtiva, setMissaoAtiva] = useState(null)

    const [mostrarDado, setMostrarDado] = useState(false)
    const [rolada, setRolada] = useState(false)
    const [missoesConcluidas, setMissoesConcluidas] = useState([])
    const [xpAtual, setXpAtual] = useState(0)
    const [nivelAtual, setNivelAtual] = useState(1)
    useEffect(
        () => {
        carregarDados()
        }, [])

        const carregarDados = async () => {
            try {
                const usuarioLocal =
                    JSON.parse(
                        localStorage.getItem("usuario")
                    )

                const usuarioResp =
                    await api.get(
                        `/usuarios/${usuarioLocal.id}`
                    )

                const missoesResp =
                    await api.get("/missoes")

                const sprintIds =
                    usuarioResp.data.kanban.sprint
                const concluidasIds =
                    usuarioResp.data.kanban.concluido

                const concluidas =
                    missoesResp.data.filter(
                        missao =>
                            concluidasIds.includes(
                                Number(missao.codigo)
                            )
                    )

                setMissoesConcluidas(concluidas)

                const personagemLocal = JSON.parse(localStorage.getItem("personagem"))
                    setXpAtual(personagemLocal?.xp || 0)
                    setNivelAtual(personagemLocal?.nivel || 1)
                    setPersonagem(personagemLocal)
                setNivelAtual(usuarioResp.data.nivel || 1)
                const sprintMissoes =
                    missoesResp.data.filter(
                        missao =>
                            sprintIds.some(
                                id =>
                                    Number(id) === Number(missao.codigo)
                            )
                    )

                setMissoesSprint(
                    sprintMissoes
                )
                console.log("Usuario:", usuarioResp.data)

                console.log(
                    "Sprint IDs:",
                    usuarioResp.data.kanban.sprint
                )

                console.log(
                    "Missoes:",
                    missoesResp.data
                )

                console.log(
                    "Sprint Missoes:",
                    sprintMissoes
                )
            }  catch (err) {
                console.error("Erro ao carregar dados:", err)
            }
        }

    return (
        <div
            className="
                w-150
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
                font-[Orbitron]
            "
        >

            <div
                className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    -top-3
                    w-80
                    h-8
                    rounded-2xl
                    bg-black
                    text-center
                "
            >
                <h1 className="font-[Orbitron] font-medium text-xl tracking-widest">
                    PAINEL DE CONTROLE
                </h1>
            </div>
            <div className="mt-3 mb-5">

            <div className="flex justify-between text-sm">

                <span>
                    {personagem?.nome_personagem}
                </span>

                <span>
                    LV {nivelAtual}
                </span>

            </div>

            <div className="border border-green-500 h-4 rounded mt-1">

                <div
                    className="
                        bg-green-500
                        h-full
                        transition-all
                    "
                    style={{
                        width: `${Math.min(
                            (xpAtual / (nivelAtual * 100)) * 100,
                            100
                        )}%`
                    }}
                />

            </div>

            <div className="text-center text-xs mt-1">

                XP: {xpAtual}

            </div>

        </div>
            {!missaoAtiva ? (

                <>
                    <h1 className=" text-xl text-center">
                        MISSÕES DISPONÍVEIS
                    </h1>

                    <div className="flex flex-wrap gap-4 justify-center">
                        {
                                missoesSprint.length === 0 && (

                                    <div className="text-center mt-10">

                                        <h1>
                                            Nenhuma missão disponível.
                                        </h1>

                                        <p className="text-sm mt-2">
                                            Aguarde o mestre atribuir novas missões.
                                        </p>

                                    </div>

                                )
                            }
                        {
                            missoesSprint.map(missao => (

                                <div
                                    key={missao.codigo}
                                    className="
                                        w-60
                                        border
                                        border-green-500
                                        rounded-xl
                                        p-3
                                        cursor-pointer
                                        hover:shadow-[0_0_15px_#22c55e]
                                    "
                                >

                                    <h1 className="font-bold text-green-400">
                                        {missao.nome}
                                    </h1>

                                    <p className="text-sm mt-1">
                                        Alvo: {missao.alvo}
                                    </p>

                                    <p className="text-sm">
                                        XP Base: {missao.ganho_xp}
                                    </p>

                                    <p className="text-sm">
                                        Atributo: {missao.atributo_necessario?.toUpperCase()}
                                    </p>

                                    <button
                                        className="
                                            mt-2
                                            border
                                            border-green-500
                                            rounded-xl
                                            px-2
                                            py-1
                                            cursor-pointer
                                            text-sm
                                        "
                                        onClick={() =>
                                            setMissaoAtiva(
                                                missao
                                            )
                                        }
                                    >
                                        Iniciar
                                    </button>

                                </div>

                            ))
                        }

                    </div>
                    <div className="mt-2 flex-col flex">
                    <button
                        onClick={carregarDados}
                        className="
                            border
                            border-green-500
                            px-3
                            py-1
                            rounded-xl
                            hover:shadow-[0_0_10px_#22c55e]
                            text-sm
                            transition-all
                        "
                    >
                        Atualizar missões
                    </button>
                        <h1 className="text-center text-lg">

                            MISSÕES CONCLUÍDAS

                        </h1>

                        <div className="font=[Orbitron] mt-3 flex text-sm flex-wrap gap-2 justify-center">

                            {
                                missoesConcluidas.map(
                                    missao => (

                                        <div
                                            key={missao.codigo}
                                            className="
                                                border
                                                border-green-500
                                                rounded-xl
                                                px-3
                                                py-1
                                            "
                                        >
                                            ✔ {missao.nome}
                                        </div>

                                    )
                                )
                            }

                        </div>

                    </div>
                </>

            ) : (

                <>

                    <h1 className="mt-2 text-sm">
                        {"> Missão"}
                    </h1>

                    <h1
                        className="
                            ml-8
                            font-bold
                            text-green-500
                            animate-pulse
                            text-lg
                        "
                    >
                        {missaoAtiva.nome}
                    </h1>

                    <h1 className="text-sm">
                        {"> Descrição"}
                    </h1>

                    <h1
                        className="
                            ml-8
                            text-lg
                            font-light
                            text-green-300
                            leading-10
                            
                        "
                    >
                        {missaoAtiva.descricao}
                    </h1>

                    <div className="text-center mt-5 text-lg">

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
                                            text-lg
                                            border
                                            border-green-300
                                            hover:shadow-[0_0_20px_#22c55e]
                                        "
                                        onClick={() =>
                                            setMostrarDado(
                                                true
                                            )
                                        }
                                    >
                                        Entrar na Missão
                                    </button>

                                    <ModalDado
                                        aberto={
                                            mostrarDado
                                        }
                                        missao={
                                            missaoAtiva
                                        }
                                        personagem={
                                            personagem
                                        }
                                        setPersonagem={
                                            setPersonagem
                                        }
                                        setMissaoAtiva={setMissaoAtiva} 
                                        fechar={() => {

                                            setMostrarDado(
                                                false
                                            )

                                            setRolada(
                                                true
                                            )

                                            carregarDados()
                                        }}
                                    />

                                </>

                            )
                        }

                    </div>

                    <div className="text-center mt-5">

                        <button
                            className="
                                border
                                border-red-500
                                px-3
                                py-1
                                rounded-xl
                                text-sm
                                cursor-pointer
                            "
                            onClick={() => {

                                setMissaoAtiva(
                                    null
                                )

                                setRolada(
                                    false
                                )

                            }}
                        >
                            Voltar
                        </button>

                    </div>

                </>

            )}

        </div>
    )
}

export default DashboardJogador