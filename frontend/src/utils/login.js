export function salvarUsuario(usuario){
    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    )
}