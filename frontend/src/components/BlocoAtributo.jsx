

    function BlocoAtributo(props){
        return (
            <div className="w-full h-full rounded-xl text-blue-950 pt-2 flex items-center" >
                <div className="flex justify-between items-center w-full font-[Audiowide]">
                    <h1 className="font-[Audiowide]">
                        {props.titulo}
                    </h1>
                    <h1>
                        {props.valor}
                    </h1>
                </div>
            </div>
        )
    }
export default BlocoAtributo