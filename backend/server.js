const express = require('express')
const cors = require('cors')

const axios = require("axios")
const app = express()
const bcrypt = require("bcrypt")

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
}); 

io.on("connection", (socket) => {

    console.log("Usuário conectado");

    socket.on("enviarMensagem", (mensagem) => {

        console.log(mensagem);

        io.emit("receberMensagem", mensagem);
    });

    socket.on("disconnect", () => {
        console.log("Usuário saiu");
    });
});
app.use(cors())
app.use(express.json())


app.get("/api/missoes", async (req, res) => {
    const resposta = await axios.get("http://localhost:3000/missoes")

    res.json(resposta.data)
})
app.get("/api/personagens", async (req, res) => {
    const resposta = await axios.get("http://localhost:3000/personagens")
    res.json(resposta.data)
})
app.post("/api/usuarios", async (req, res) => {

    const { usuario, senha, personagem } = req.body

    const usuariosResp = await axios.get(
        "http://localhost:3000/usuarios"
    )

    const usuarioExistente =
        usuariosResp.data.find(
            u => u.usuario === usuario
        )

    if(usuarioExistente){
        return res.status(400).json({
            erro: "Usuário já cadastrado"
        })
    }
    const senhaHash = await bcrypt.hash(senha, 10)
    const novoUsuario = {
        usuario,
        senha:senhaHash,
        tipo: "jogador",
        personagem,
        missao: null,
        status: "ativo"
    }

    const criado = await axios.post(
        "http://localhost:3000/usuarios",
        novoUsuario
    )

    res.status(201).json(criado.data)

})
app.post("/api/login", async (req, res) => {

    const { usuario, senha } = req.body

    try {
        const usuariosResp = await axios.get(
            "http://localhost:3000/usuarios"
        )
        const usuarioEncontrado = usuariosResp.data.find(
            user => user.usuario === usuario
                )

                if (!usuarioEncontrado) {
                    return res.status(401).json({
                        erro: "Usuário ou senha inválidos"
                    })
                }
                console.log("Usuario recebido:", usuario)
                console.log("Senha recebida:", senha)
                console.log("Usuario encontrado:", usuarioEncontrado)
                const senhaValida = await bcrypt.compare(
                    senha,
                    usuarioEncontrado.senha
                )

                if (!senhaValida) {
                    return res.status(401).json({
                        erro: "Usuário ou senha inválidos"
                    })
                }

        let personagemEncontrado = null
        let missaoEncontrada = null

        if (usuarioEncontrado.tipo !== "mestre") {

            const personagensResp = await axios.get(
                "http://localhost:3000/personagens"
            )

            const missoesResp = await axios.get(
                "http://localhost:3000/missoes"
            )

            personagemEncontrado =
                personagensResp.data.find(
                    p => Number(p.id) === Number(usuarioEncontrado.personagem)
                )
            console.log(personagemEncontrado)
            missaoEncontrada =
            missoesResp.data.find(
                m => Number(m.id) === Number(usuarioEncontrado.missao)
            )
            console.log(missaoEncontrada)
        }

        res.json({
            usuario: usuarioEncontrado,
            personagem: personagemEncontrado ?? null,
            missao: missaoEncontrada ?? null
        })

    } catch (erro) {

        console.log(erro)

        res.status(500).json({
            erro: "Erro interno"
        })
    }
})
app.get("/api/usuarios", async (req, res) => {

    try {

        const usuariosResp = await axios.get(
            "http://localhost:3000/usuarios"
        )

        res.json(usuariosResp.data)

    } catch (erro) {

        console.log(erro)

        res.status(500).json({
            erro: "Erro ao buscar usuários"
        })
    }
})

server.listen(3001, () => {
    console.log("Servidor rodando na porta 3001")})