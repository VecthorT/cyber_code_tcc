function DashboardJogador(props) {
return (
    <div className="w-150
                    h-100
                    p-2
                    bg-black
                    border-green-500
                    border-2
                    rounded-4xl
                    shadow-[0_0_2px_#03A062]
                    hover:shadow-[0_0_20px_#03A062]
                    hover:scale-105
                    transition-all
                    duration-200
                    relative
                    text-green-400
                    ">
                        <div className="absolute
                                        left-1/2
                                        -translate-x-1/2
                                        -top-3
                                        w-80
                                        h-8
                                        bg-black
                                        text-center">
                            <h1 className="font-[Orbitron] font-medium text-xl tracking-widest">PAINEL DE CONTROLE</h1>
                        </div>
                        <div className="
                                        flex
                                        pl-2
                                        pt-2
                                        font-[Rajdhani]
                                        text-xl
                        ">
                        <h1>{"> Missão Principal"}
                            <h4 className="ml-8 font-bold text-green-300 cursor-pointer hover:scale-105">
                                {props.missao}
                                {props.requisitos}
                            </h4>
                        </h1>

                        </div>

    </div>
)
}

export default DashboardJogador