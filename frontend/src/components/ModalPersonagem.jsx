import { useState, useEffect } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

function ModalPersonagem({fechar, usuario, senha}){
    const [personagemSelecionado, setPersonagemSelecionado] = useState(null)
    const [personagens, setPersonagens] = useState([])
    const [pagina, setPagina] = useState(0)
    const navigate = useNavigate()
    const personagensVisiveis =
    personagens.slice(
        pagina * 5,
        pagina * 5 + 5
    )

    useEffect(() => {

        async function carregarPersonagens(){

            const resposta = await api.get("/personagens")

            setPersonagens(resposta.data)
        }

        carregarPersonagens()

    }, [])
    async function confirmar(){
        if(!personagemSelecionado){
            alert("Selecione um personagem")
        }
        else{
            const novoUsuario = {
            usuario: usuario,
            senha: senha,
            tipo: "jogador",
            personagem: personagemSelecionado,
            missao: 1,
            status: "ativo"
            }
    
            await api.post("/usuarios", novoUsuario)
            navigate("/")

        }

    }

    return (
        <div className="                
                fixed
                inset-10
                z-40
                items-center
                justify-center
                text-center
                bg-black/80
                ">

        <div className="text-2xl m-10">
            <p>Selecione seu personagem</p>
        </div>

        <div className="               
               
                flex
                items-center
                justify-center
                text-center
                gap-5">
            {personagensVisiveis.map(personagem => (    
                <div
                    key={personagem.id}
                    onClick={() => setPersonagemSelecionado(personagem.id)}
                    className={`
                        w-50
                        h-70
                        bg-black
                        border-2
                        rounded-3xl
                        cursor-pointer
                        transition-all
                        text-sm
                        pt-3
                        ${
                            personagemSelecionado === personagem.id
                            ? "border-cyan-400 shadow-[0_0_25px_#22d3ee] animate-pulse scale-105"
                            : "border-gray-600"
                        }
                    `}
                >

                    <h1>{personagem.nome_personagem}</h1>

                    <h2>{personagem.classe}</h2>
                    <br></br>

                    <hr />
                    <br></br>

                    <p>FOR: {personagem.atributos.for}</p>
                    <p>DES: {personagem.atributos.des}</p>
                    <p>INT: {personagem.atributos.int}</p>
                    <p>HACK: {personagem.atributos.hack}</p>

                </div>
                
                

            ))}
        </div>
            <div className="flex gap-4 text-4xl justify-center mt-4 inset-0 z-20">
                <button
                    onClick={() => setPagina(p => Math.max(0, p - 1))}
                >
                    ◀
                </button>

                <button
                    onClick={() =>
                        setPagina(p =>
                            Math.min(
                                Math.floor(personagens.length / 5),
                                p + 1
                            )
                        )
                    }
                >
                    ▶
                </button>
            </div>
            <div className="text-2xl mt-5 gap-2">
                <button className=" border w-80 justify-center items-center cursor-pointer rounded-2xl bg-black hover:scale-105"
                onClick={confirmar}>
                    Confirmar
                </button>
                <button className=" border w-80 justify-center items-center cursor-pointer rounded-2xl bg-black hover:scale-105"
                onClick={fechar}>
                    Fechar
                </button>
            </div>
        </div>
    )

}
export default ModalPersonagem