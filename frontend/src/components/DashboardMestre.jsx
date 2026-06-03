import { useEffect, useState } from "react"
import api from "../services/api"
import ModalCadastroMissao from "./ModalCadastroMissao"
import {
  FaHammer,
  FaBolt,
  FaBrain,
  FaTerminal
} from "react-icons/fa";

function DashboardMestre(){
    const [kanban, setKanban] = useState({})
    const [usuarios, setUsuarios] = useState([])
    const [personagens, setPersonagens] = useState([])
    const [missoes, setMissoes] = useState([])
    const [usuarioSelecionado, setUsuarioSelecionado] = useState("")
    const [missaoSelecionada,setMissaoSelecionada] = useState("")
    const [mostrarCadastroMissao, setMostrarCadastroMissao] = useState(false)
    useEffect(()=> {
        async function carregaUsuarios(){
            const usuarioResp = await api.get("/usuarios")
            const missaoResp = await api.get("/missoes")
            const personagemResp = await api.get("/personagens")
            
            const jogador = usuarioResp.data.filter(u=> u.tipo==="jogador")
            setUsuarios(jogador)
            setMissoes(missaoResp.data)
            setPersonagens(personagemResp.data)
        } carregaUsuarios()
    },[])
    const usuario = usuarios.find(
        u => u.id == usuarioSelecionado
    )

    const personagemSelecionado = personagens.find(
        p => p.id == usuario?.personagem
    )
    const missoesBacklog = missoes.filter(
        m => usuario?.kanban?.backlog.some(
            id => Number(id) === Number(m.codigo)
        )
    )

    const sprintMissoes = missoes.filter(m =>
        usuario?.kanban?.sprint.includes(Number(m.codigo))
    )

    const concluidasMissoes = missoes.filter(m =>
        usuario?.kanban?.concluido.includes(Number(m.codigo))
    )
    function moverParaSprint(idMissao) {
        console.log("Cliquei", idMissao)
        const novoUsuario = {
            ...usuario,
            kanban: {
                ...usuario.kanban,
                backlog: usuario.kanban.backlog.filter(
                    id => id !== idMissao
                ),
                sprint: [
                    ...usuario.kanban.sprint,
                    idMissao
                ]
            }
        }
        // Atualiza o state dos usuários
        setUsuarios(prev =>
            prev.map(u =>
                u.id == usuario.id ? novoUsuario : u
            )
        )
    }
    function moverParaConcluido(idMissao) {
        console.log("Cliquei", idMissao)
        const novoUsuario = {
            ...usuario,
            kanban: {
                ...usuario.kanban,
                sprint: usuario.kanban.sprint.filter(
                    id => id !== idMissao
                ),
                concluido: [
                    ...usuario.kanban.concluido,
                    idMissao
                ]
            }
        }
        // Atualiza o state dos usuários
        setUsuarios(prev =>
            prev.map(u =>
                u.id == usuario.id ? novoUsuario : u
            )
        )
    }
    async function salvarKanban() {

    await api.patch(`/usuarios/${usuario.id}`, {
        kanban: usuario.kanban
    })

        alert("Kanban salvo!")
    }
    async function atribuirMissao() {
        if (
    usuario.kanban.backlog.includes(Number(missaoSelecionada))
        ) {
            alert("Missão já está no backlog")
            return
        }
        const novoUsuario = {
            ...usuario,
            kanban: {
                ...usuario.kanban,
                backlog: [
                    ...usuario.kanban.backlog,
                    Number(missaoSelecionada)
                ]
            }
        }

        setUsuarios(prev =>
            prev.map(u =>
                u.id == usuario.id ? novoUsuario : u
            )
        )
    }
    function sair(){

        localStorage.clear()

        window.location.href = "/"

     }
    
    return (
        <div className="w-140 h-150 border-cyan-500
                        border rounded-2xl shadow-[0_0_2px_#03A062]
                        hover:shadow-[0_0_20px_#03A062]
                        font-[Orbitron] text-sm">
            <div className="flex flex-col items-center justify-center">
                
                <select className="text-sm flex
                                    justify-center text-center
                                    w-50 rounded-2xl
                                    border-cyan-500 border
                                    mt-5" value={usuarioSelecionado} onChange={(e)=> setUsuarioSelecionado(e.target.value)}>
                    <option value="">
                        Selecione um usuário
                    </option>
                    {
                        usuarios.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.usuario}
                            </option>
                        ))
                    }
                </select>

            </div>
            {
                usuarioSelecionado && (
                    <>
                <div className="flex justify-center items-center gap-5">
                    <h1 className="text-sm mt-2">{personagemSelecionado?.nome_personagem}</h1>
                    <h1 className="text-sm mt-2">{personagemSelecionado?.classe}</h1>
                    <h1 className="text-sm mt-2">LEVEL: {personagemSelecionado?.level}</h1>
                    <h1 className="text-sm mt-2">XP: {personagemSelecionado?.xp}</h1>
                </div>
                <div className="flex gap-4 mt-2 items-center justify-center text-lg">
                    <span className="flex items-center gap-1">
                        FOR • 
                        <FaHammer />
                        {personagemSelecionado?.atributos?.for}
                    </span>
                    <span className="flex items-center gap-1">
                        DES • 
                        <FaBolt />
                        {personagemSelecionado?.atributos?.des}
                    </span>

                    <span className="flex items-center gap-1">
                        INT • 
                        <FaBrain />
                        {personagemSelecionado?.atributos?.int}
                    </span>

                    <span className="flex items-center gap-1">
                        HACK • 
                        <FaTerminal />
                        {personagemSelecionado?.atributos?.hack}
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-5 text-sm m-2">

                    <div className="border border-red-500 rounded-lg p-3">
                        <h2 className="text-center font-bold">
                            BACKLOG 
                             {
                                missoesBacklog.map(missao => (
                                    <div
                                        key={missao.codigo}
                                        className="border p-2 rounded mb-2"
                                    >
                                        {missao.nome}
                                        <button
                                            onClick={() => moverParaSprint(Number(missao.codigo))} className="cursor-pointer"
                                        >
                                            ➡ Sprint
                                        </button>
                                    </div>
                                ))
                            }
                        </h2>
                    </div>

                    <div className="border border-yellow-500 rounded-lg p-3">
                        <h2 className="text-center font-bold">
                            SPRINT
                            {
                                sprintMissoes.map(missao => (
                                    <div
                                        key={missao.codigo}
                                        className="border p-2 rounded mb-2"
                                    >
                                        {missao.nome}
                                        <button
                                            onClick={() => moverParaConcluido(Number(missao.codigo))} className="cursor-pointer"
                                        >
                                            ➡ Concluir
                                        </button>
                                    </div>
                                ))
                            }
                        </h2>
                    </div>

                    <div className="border border-green-500 rounded-lg p-3">
                        <h2 className="text-center font-bold">
                            CONCLUÍDAS
                            {
                                concluidasMissoes.map(missao => (
                                    <div
                                        key={missao.codigo}
                                        className="border p-2 rounded mb-2"
                                    >
                                        {missao.nome}
                                    </div>
                                ))
                            }
                        </h2>
                    </div>
            </div>
                <div className="flex justify-center items-center text-center text-sm">
                    <button className="rounded-2xl
                                        border cursor-pointer p-2
                                        hover:bg-cyan-800 hover:text-white
                                        transition-all"
                                        onClick={salvarKanban}>
                        Salvar Alterações
                    </button>
                </div>
                <div className="flex align-middle ml-2 mt-2">
                    <h1>Adicionar uma missao: </h1>
                    <select
                    value={missaoSelecionada}
                    onChange={(e)=>setMissaoSelecionada(e.target.value)}
                    >
                    {
                    missoes.map(m=>(
                    <option key={m.codigo} value={m.codigo}>
                        {m.nome}
                    </option>
                    ))
                    }
                    </select>
                    <button className="rounded-2xl
                                        border cursor-pointer p-2
                                        hover:bg-cyan-800 hover:text-white
                                        transition-all"
                                        onClick={atribuirMissao}>
                    Adicionar ao Backlog
                    </button>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 mt-4">

                        <button
                            className="
                                rounded-2xl
                                border
                                cursor-pointer
                                p-2
                                ml-2
                                hover:bg-green-700
                                hover:text-white
                            "
                            onClick={() => setMostrarCadastroMissao(true)}
                        >
                            Nova Missão
                        </button>
                            <button className="
                            text-lg
                            px-2
                            border
                            border-red-500
                            rounded-xl
                            bg-red-500
                            text-black
                            hover:bg-red-500
                            hover:text-black
                            transition-all
                            cursor-pointer"
                            onClick={sair}
                           >
                            Encerrar Conexão
                            </button>
                    </div>
                    <ModalCadastroMissao
                        aberto={mostrarCadastroMissao}
                        fechar={() =>
                            setMostrarCadastroMissao(false)
                        }
                    />
            </>
            
                )
            }
            
        </div>
    )
}
export default DashboardMestre