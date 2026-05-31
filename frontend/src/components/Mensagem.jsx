
function Mensagem(props) {
    let usermsg = props.user
    if(!usermsg){
        usermsg = "SYSTEM"
    }
    return (
        <div className="flex">
            <h1 className="animate-pulse">{">"}</h1>
            <h1 className="pl-2">{usermsg}{"  :  "}{props.msg}</h1>
        </div>
    )
}
export default Mensagem