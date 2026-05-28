const express = require('express')
const cors = require('cors')

const armas = require('./data/armas.json')
const missoes = require('./data/missoes.json')
const personagens = require('./data/personagens.json')
const usuarios = require('./data/usuarios.json')

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/armas", (req, res) => {
    res.json(armas)
})
app.get("/api/missoes", (req, res) => {
    res.json(missoes)
})
app.get("/api/personagens", (req, res) => {
    res.json(personagens)
})
app.get("/api/usuarios", (req, res) => {
    res.json(usuarios)
})

app.post("/api/login", (req, res) => {
    const {usuario, senha} = req.body
    const usuarioEncontrado = usuarios.find(
        user =>
            user.usuario == usuario &&
            user.senha == senha
    )
    if(!usuarioEncontrado) {
        return res.status(401).json({
            erro : "Usuario ou senha Invalidos"
        })
    }
    let personagensEncontrado = null
    if(usuarioEncontrado.tipo !="mestre"){
        personagensEncontrado = personagens.find(
            p => p.id == usuarioEncontrado.personagem
        )
        missaoEncontrada = missoes.find(
            m => m.id == usuarioEncontrado.missao
        )
        armasEncontradas = armas.filter(
            a => personagensEncontrado.armas.includes(a.id)
        )
    }
    res.json({
        usuario: usuarioEncontrado,
        personagem: personagensEncontrado,
        armas: armasEncontradas,
        missao:missaoEncontrada
    })
})

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001")
})