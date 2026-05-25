import FichaPersonagem from "../components/FichaPersonagem"
import DashboardJogador from "../components/DashboardJogador"

function Jogador() {
  return (
    <div className="min-h-screen items-center justify-center bg-black flex-col flex">

      <div className="bg-black text-cyan-400 flex items-start justify-center text-4xl gap-8 mt-8">
        <FichaPersonagem nome="ELOIZA" classe="ANDROID"></FichaPersonagem>
        <DashboardJogador
                missao="Invadir Firewall da Corporação Capsula"
                requisitos="FOR >= 5"
        ></DashboardJogador>

      </div>
      <div className="bg-black text-cyan-400 flex items-center justify-center text-4xl gap-8 mt-4">
        <h1>CHAT</h1>
      </div>
    </div>
  )
}

export default Jogador