
import BlocoAtributo from "./BlocoAtributo"
import IconeForca from "../assets/assets5.png"
function FichaPersonagem(props){
    const personagem = JSON.parse(localStorage.getItem("personagem"))
    const forca = personagem.atributos.for
    const destreza = personagem.atributos.des
    const inteligencia = personagem.atributos.int
    const hack = personagem.atributos.hack
    const level = personagem.level
    const xp = personagem.xp
    
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
                <BlocoAtributo titulo="FOR" valor={forca} icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="DES" valor={destreza} icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="INT" valor={inteligencia} icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="HACK" valor={hack} icone={IconeForca}></BlocoAtributo>
                <br></br>
                <BlocoAtributo titulo="LEVEL" valor={level} icone={IconeForca}></BlocoAtributo>
                <BlocoAtributo titulo="XP" valor={xp} icone={IconeForca}></BlocoAtributo>
            </div>
            </div>
        </div>

    )
}

export default FichaPersonagem