
import BlocoAtributo from "./BlocoAtributo"
import IconeForca from "../assets/assets5.png"
function FichaPersonagem(props){
    return(
        <div className="font-[Audiowide] justify-center items-center flex flex-col">
            <div className="w-70
                            h-100
                            outline-none
                            p-2
                            bg-white
                            rounded-4xl
                            shadow-[0_0_2px_#22d3ee]
                            hover:shadow-[0_0_20px_#22d3ee]
                            hover:scale-105
                            transition-all
                            duration-200
                            ">
            <div className="flex flex-col items-center">
                
                {/*Icone*/}
                <div className="w-10 h-8 bg-white -mt-6 rounded-2xl">
                    <img src={IconeForca} alt="" className="w-full h-full object-cover"  />
                </div>
                {/*Infos*/}
                <h1 className=" text-purple-900">
                    {props.nome}
                </h1>
                <h1 className="text-sm -mt-0.5">
                    {props.classe}
                </h1>
                <BlocoAtributo titulo="FOR" valor="5" icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="DES" valor="5" icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="INT" valor="5" icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="TEC" valor="5" icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="LEVEL" valor="2" icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="XP" valor="500" icone={IconeForca}></BlocoAtributo>
            </div>
            </div>
        </div>

    )
}

export default FichaPersonagem