
function Input(props) {
    return (
        <div className="flex flex-col text-center">
            <input className="
                bg-black
                rounded-2xl
                text-cyan-400
                border-b-2
                border-cyan-500
                outline-none
                px-2
                py-2
                caret-cyan-400
                focus:shadow-[0_0_15px_#22d3ee]
                transition-all" placeholder={props.placeholder} type={props.type ||"text"}/>
        </div>  
    )
}
export default Input