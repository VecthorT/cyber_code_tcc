import { useEffect, useState } from "react"
import Mensagem from "../components/Mensagem"
import socket from "../services/socket"

function TerminalChat(props){
    let missao = props.missao
    const usuario = props.usuario
    const personagem = props.personagem
    const [mensagens, setMensagens] = useState([]);
    const [mensagemUser, setMensagemUser] = useState([]);

    useEffect(() => {

    socket.on("connect", () => {
        console.log("Conectado", socket.id);
    });

    socket.on("receberMensagem", (msg) => {
        console.log("Recebi:", msg);

        setMensagens(prev => [...prev, msg].slice(-10));
    });

    return () => {
        socket.off("connect");
        socket.off("receberMensagem");
    };

    }, []);

    function enviarMensagem(texto) {
        socket.emit("enviarMensagem", {
            nome: personagem,
            tipo: usuario.tipo,
            texto: texto
        });
    }

    return(

        <div>
            <div className="   
                            w-70 
                            h-105
                            p-2
                            bg-black
                            border-green-500
                            border-2
                            rounded-2xl
                            shadow-[0_0_2px_#03A062]
                            hover:shadow-[0_0_20px_#03A062]
                            transition-all
                            duration-200
                            relative
                            text-green-400
                            text-sm
                            pt-5
                            ">
                        <div>
                            {
                                !missao && (
                                    <Mensagem msg="Carregando missões aguarde"></Mensagem>
                                )
                            }
                            <>
                                { mensagens && (
                                    mensagens.map((msg, index)=>(
                                        <Mensagem user={msg.nome} msg={msg.texto} key={index}></Mensagem>
                                    ))
                                    ) 
                                }
                            </>

                        </div>
                    <div className="absolute
                                    left-1/2
                                    -translate-x-1/2
                                    -top-3
                                    w-30
                                    h-8
                                    rounded-2xl
                                    bg-black
                                    text-center">
                        <h1 className="font-[Orbitron] font-medium text-xl tracking-widest">CHAT</h1>
                    </div>

            </div>
             <div className="
                            w-70 
                            h-15
                            p-2
                            bg-black
                            border-green-500
                            border-2
                            rounded-2xl
                            shadow-[0_0_2px_#03A062]
                            hover:shadow-[0_0_20px_#03A062]
                            transition-all
                            duration-200
                            text-green-400
                            text-sm
                            flex
                            focus:border-0
                            gap-2
                            justify-between
                            ">
                                <input className="border-b rounded-2xl border-green-500 w-50 pl-2"
                                                    onChange={(e)=>(setMensagemUser(e.target.value))}></input>
                                <button className="border rounded-2xl p-2 cursor-pointer hover:animate-pulse"
                                                    onClick={()=>(enviarMensagem(mensagemUser))}>request</button>
                            </div>

        </div>
                        )
                    }
export default TerminalChat