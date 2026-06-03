import { useState } from "react"
import api from "../services/api"

function ModalCadastroMissao({
    aberto,
    fechar
}) {

    const [form, setForm] = useState({
        codigo: "",
        nome: "",
        alvo: "",
        descricao: "",
        conteudo: "",
        resposta: "",
        xp_base: 100,
        atributo: "hack",

        alternativaA: "",
        alternativaB: "",
        alternativaC: "",
        alternativaD: ""
    })

    async function cadastrarMissao() {

        const novaMissao = {

            codigo: Number(form.codigo),

            nome: form.nome,

            alvo: form.alvo,

            descricao: form.descricao,

            conteudo: form.conteudo,

            alternativas: {
                A: form.alternativaA,
                B: form.alternativaB,
                C: form.alternativaC,
                D: form.alternativaD
            },

            resposta: form.resposta,

            xp_base: Number(form.xp_base),

            atributo: form.atributo
        }

        await api.post(
            "/missoes",
            novaMissao
        )

        alert("Missão cadastrada!")

        fechar()
    }

    if (!aberto) return null

    return (
        <div className="
            fixed
            inset-0
            bg-black/80
            flex
            items-center
            justify-center
            z-50
        ">

            <div className="
                bg-black
                border
                border-cyan-500
                rounded-2xl
                p-5
                w-[700px]
                text-cyan-400
                flex
                flex-col
                gap-2
            ">

                <h1 className="text-xl text-center">
                    Nova Missão
                </h1>

                <input
                    placeholder="Código"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            codigo:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Nome"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            nome:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Alvo"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            alvo:e.target.value
                        })
                    }
                />

                <textarea
                    placeholder="Descrição"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            descricao:e.target.value
                        })
                    }
                />

                <textarea
                    placeholder="Conteúdo da questão"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            conteudo:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Alternativa A"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            alternativaA:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Alternativa B"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            alternativaB:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Alternativa C"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            alternativaC:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Alternativa D"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            alternativaD:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Resposta (A/B/C/D)"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            resposta:e.target.value
                        })
                    }
                />

                <input
                    placeholder="XP"
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            xp_base:e.target.value
                        })
                    }
                />

                <select
                    className="border p-2"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            atributo:e.target.value
                        })
                    }
                >
                    <option value="for">FOR</option>
                    <option value="des">DES</option>
                    <option value="int">INT</option>
                    <option value="hack">HACK</option>
                </select>

                <div className="flex gap-2">

                    <button
                        onClick={cadastrarMissao}
                        className="
                            flex-1
                            bg-green-700
                            p-2
                            rounded
                        "
                    >
                        Salvar
                    </button>

                    <button
                        onClick={fechar}
                        className="
                            flex-1
                            bg-red-700
                            p-2
                            rounded
                        "
                    >
                        Cancelar
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ModalCadastroMissao