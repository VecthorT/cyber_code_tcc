import womanImg from "../assets/woman-2.png"
import molduraAsset from "../assets/assets2.png"
import Input from "../components/Input"
import ModalPersonagem from "../components/ModalPersonagem"
// 
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
function Cadastro() {

  const navigate = useNavigate()
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmaSenha, setConfirma] = useState("")
  const [alerta, setAlerta] = useState("")
  const [mostraModalPers, setMostraModal] = useState(false)

  async function cadastrar(){
    const resposta = await api.get("/usuarios")
    const usuarioExiste = resposta.data.find(
        user => user.usuario.toLowerCase() === usuario.toLowerCase()
    )

    if(usuarioExiste){
      setAlerta("Usuário já cadastrado")
      return
    }
    if(senha != confirmaSenha){
      setAlerta("Senhas não Correspondem")
      return
    }

    if(senha.length < 8){
      setAlerta("Senha deve ter mais de 8 caracteres")
      return
    }
    setMostraModal(true)
    function fechar(){
      setMostraModal(false)
    }
  }

  return (
    <div>
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
            <Input placeholder="Novo Usuário" onChange={(e) => setUsuario(e.target.value)}></Input>
        </h4>
        <h4 className="mt-2  font-light font-[JetBrains+Mono] text-2xl">
            <Input placeholder="Senha" tipo='password' onChange={(e) => setSenha(e.target.value)}></Input>
        </h4>
        <h4 className="mt-2  font-light font-[JetBrains+Mono] text-2xl">
            <Input placeholder="Confirma Senha" tipo='password'  onChange={(e) => setConfirma(e.target.value)}></Input>
        </h4>
        <p className="text-sm mt-2 text-red-500">
          {alerta}
        </p>
        <button className="mt-3 text-2xl text-purple-600 border rounded p-1 hover:text-green-600 hover:bg-white" onClick={cadastrar} >
            Cadastro
        </button>
        <button className="mt-3 text-2xl text-purple-600 border rounded p-1 hover:text-green-600 hover:bg-white" onClick={() => navigate("/")}>
            Voltar
        </button>
          <img
            src={womanImg} className="absolute bottom-0 left-0 w-72 opacity-30"
          />
          <img
            src={molduraAsset} className="absolute top-0 left-0 w-72 opacity-50"
          />
            {
            mostraModalPers && (
              <ModalPersonagem
                usuario={usuario}
                senha={senha}
                fechar={() => {setMostraModal(false)}}
              />
            )
            } 
      </div>
    </div>

  )
}

export default Cadastro