import { useEffect, useState } from "react"

function ModalDado({ aberto, fechar }) {

    const [valorDado, setValorDado] = useState(1)

    const [rolando, setRolando] = useState(false)

    function rolarDado() {

        setRolando(true)

        let contador = 0

        const intervalo = setInterval(() => {

            const numero = Math.floor(Math.random() * 20) + 1

            setValorDado(numero)

            contador++

            if (contador >= 20) {

                clearInterval(intervalo)

                setRolando(false)
            }

        }, 100)
    }
    function salvarDados() {

    }

    useEffect(() => {

        if (aberto) {

            rolarDado()
        }

    }, [aberto])

    if (!aberto) return null
    
    return (

        <div className="
            fixed
            inset-0
            bg-black/80
            flex
            items-center
            justify-center
            z-50
        ">

            <div className="
                w-96
                h-96
                bg-black
                border-2
                border-cyan-400
                rounded-4xl
                flex
                flex-col
                items-center
                justify-center
                shadow-[0_0_40px_#22d3ee]
                relative
            ">

                <h1 className="
                    text-cyan-400
                    text-3xl
                    mb-6
                    font-[Orbitron]
                ">
                    D20 SYSTEM
                </h1>

                <div className={`
                    w-40
                    h-40
                    rounded-3xl
                    border-2
                    flex
                    items-center
                    justify-center
                    text-8xl
                    font-bold
                    transition-all
                    duration-200

                    ${valorDado === 20
                        ? "border-yellow-400 text-yellow-400 shadow-[0_0_40px_gold]"
                        : valorDado === 1
                            ? "border-red-500 text-red-500 shadow-[0_0_40px_red]"
                            : "border-cyan-400 text-cyan-400 shadow-[0_0_30px_#22d3ee]"
                    }

                    ${rolando ? "animate-pulse scale-110" : ""}
                `}>

                    {valorDado}

                </div>

                <div className="mt-6">

                    {
                        valorDado === 20 && !rolando &&
                        <p className="text-green-400 text-xl">
                            ⚡ CRÍTICO ⚡
                        </p>
                    }

                    {
                        valorDado === 1 && !rolando &&
                        <p className="text-red-500 text-xl">
                            ☠ FALHA CRÍTICA ☠
                        </p>
                    }


                </div>

                <div className="flex gap-4 mt-8">

                    <button
                        onClick={fechar}

                        className="
                            px-4
                            py-2
                            border
                            border-red-500
                            rounded-xl
                            text-red-500
                            hover:bg-red-500
                            hover:text-black
                            transition-all
                            cursor-pointer
                        "
                    >

                        Fechar

                    </button>

                </div>

            </div>

        </div>
    )
}

export default ModalDado