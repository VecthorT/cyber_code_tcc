function BotaoResposta(props){
    return(
        <button className="bg-black
                            border w-20
                            border-cyan-400
                            text-cyan-400
                            rounded-2xl
                            cursor-pointer
                            hover:shadow-[0_0_10px_#22d3ee]
                            "
                            onClick={() => props.responder(props.nome)}>
            {props.nome}
        </button>
    )
}
export default BotaoResposta