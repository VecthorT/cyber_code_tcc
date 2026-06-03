import ModalDado from "./ModalDado"
import ModalPergunta from "./ModalPergunta"

function ModalInteiro(props) {
    <div className="flex">
        <ModalDado ativar={props.dado}></ModalDado>
        <ModalPergunta></ModalPergunta>
    </div>
}