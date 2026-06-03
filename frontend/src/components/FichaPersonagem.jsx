
import BlocoAtributo from "./BlocoAtributo"
import IconeForca from "../assets/assets5.png"
import { useState } from "react"

function FichaPersonagem(props){
    function sair(){

        localStorage.clear()

        window.location.href = "/"

  }
    return(
        <div className="font-[Audiowide] justify-center items-center flex flex-col">
            <div className="w-70
                            h-120
                            outline-none
                            p-2
                            bg-white
                            rounded-4xl
                            shadow-[0_0_2px_#22d3ee]
                            hover:shadow-[0_0_20px_#22d3ee]
                            transition-all
                            duration-200
                            ">
            <div className="flex flex-col items-center">
                
                {/*Icone*/}
                <div className="w-10 h-8 bg-white -mt-6 rounded-2xl">
                    <img src={IconeForca} alt="" className="w-full h-full object-cover"/>
                </div>
                {/*Infos*/}
                <h1 className=" text-purple-900">
                    {props.nome}
                </h1>
                <h1 className="text-sm -mt-0.5">
                    {props.classe}
                </h1>
                <BlocoAtributo titulo="FOR" valor={props.personagem.atributos.for} icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="DES" valor={props.personagem.atributos.des} icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="INT" valor={props.personagem.atributos.int} icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="HACK" valor={props.personagem.atributos.hack} icone={IconeForca}></BlocoAtributo>
                <div className="text-red-500 items-center mt-4">
                            <button className="
                            text-lg
                            px-2
                            border
                            border-red-500
                            rounded-xl
                            bg-red-500
                            text-black
                            hover:bg-red-500
                            hover:text-black
                            transition-all

                            cursor-pointer"
                            onClick={sair}>
                            Encerrar Conexão
                            </button>
                        </div>
            </div>
            </div>
        </div>

    )
}

export default FichaPersonagem