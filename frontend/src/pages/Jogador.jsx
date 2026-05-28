import FichaPersonagem from "../components/FichaPersonagem"
import DashboardJogador from "../components/DashboardJogador"
import TerminalChat from "../components/TerminalChat"

function Jogador() {
  const personagem = JSON.parse(localStorage.getItem("personagem"))
  const missao = JSON.parse(localStorage.getItem("missao"))
  const nomeMissao = missao.nome
  const descricaoMissao = missao.descricao
  const conteudoMissao = missao.conteudo
  const nome = personagem.nome_personagem
  const classe = personagem.classe
  return (
    <div className="min-h-screen items-center justify-center bg-black flex-col flex">

      <div className="bg-black text-cyan-400 flex items-start justify-center text-4xl gap-8 mt-8">
        <FichaPersonagem nome={nome} classe={classe}></FichaPersonagem>
        <DashboardJogador
                missao={nomeMissao}
                descricao={descricaoMissao}
                desafio={conteudoMissao}
        ></DashboardJogador>
        <TerminalChat></TerminalChat>
      </div>
    </div>
  )
}

export default Jogador