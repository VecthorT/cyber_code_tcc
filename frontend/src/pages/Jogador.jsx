import FichaPersonagem from "../components/FichaPersonagem"

function Jogador() {
  return (
    <div className="bg-black h-screen text-cyan-400 flex items-center justify-center text-4xl gap-2 "> 
      <FichaPersonagem nome="ELOIZA" classe="ANDROID"></FichaPersonagem>
      <FichaPersonagem nome="VICTOR" classe="ANDROID"></FichaPersonagem>
      <FichaPersonagem nome="FLAVIA" classe="SAPATÃO"></FichaPersonagem>
    </div>
  )
}

export default Jogador