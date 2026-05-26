import womanImg from "../assets/woman-1.png"
import molduraAsset from "../assets/assets1.png"
import Input from "../components/Input"
// 
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Login() {

  const navigate = useNavigate()
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")

  async function fazerLogin(){
    try{
      const response = await api.post("/login", {
        usuario, 
        senha
      })
      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario)
      )
      localStorage.setItem(
        "personagem",
        JSON.stringify(response.data.personagem)
      )
      if(response.data.usuario.tipo === "mestre"){
        navigate("/mestre")
      }else{
        navigate("/jogador")
      }
    }catch(error){
      alert(error)
      alert("Usuario ou senha nao encontrado")
    }
  }

  return (
    <div className=" font-[Orbitron] bg-black h-screen text-cyan-400 flex flex-col items-center justify-center text-6xl">
      <h1 className="text-cyan-400 text-5xl font-bold">
        C Y B E R C O D E
      </h1>
      <h3 className="text-purple-400 text-3xl font-bold">
        Hackeando o Futuro
      </h3>
      <h4 className="text-purple-300 text-2xl font-light">
        
      </h4>
    <h4 className="mt-3 font-light font-[JetBrains+Mono] text-2xl">
        <Input placeholder="Usuário" onChange={(e) => setUsuario(e.target.value)}></Input>
    </h4>
    <h4 className="mt-2  font-light font-[JetBrains+Mono] text-2xl">
        <Input placeholder="Senha"  onChange={(e) => setSenha(e.target.value)}></Input>
    </h4>
    <button className="mt-3 text-2xl text-purple-600 border rounded p-1 hover:text-green-600 hover:bg-white" onClick={fazerLogin}>
        Entrar
    </button>
    <button className="mt-3 text-2xl text-purple-600 border rounded p-1 hover:text-green-600 hover:bg-white"  >
        Cadastro
    </button>
      <img
        src={womanImg} className="absolute bottom-0 right-0 w-72 opacity-10"
      />
      <img
        src={molduraAsset} className="absolute bottom-0 left-0 w-72 opacity-50"
      />
    </div>

  )
}

export default Login