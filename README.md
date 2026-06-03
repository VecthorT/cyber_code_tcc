# Cyber Code RPG

Sistema web gamificado para ensino de programação e conceitos de Engenharia de Software através de mecânicas inspiradas em RPG.

## Sobre o Projeto

O Cyber Code RPG foi desenvolvido como Trabalho de Conclusão de Curso (TCC) de Engenharia de Software.

O sistema transforma exercícios de programação em missões interativas dentro de um universo cyberpunk, incentivando o aprendizado através de gamificação.

Os jogadores evoluem personagens, realizam desafios técnicos, ganham experiência e progridem em missões organizadas por um sistema Kanban administrado por um Mestre.

---

## Funcionalidades

### Jogador

* Login de usuário
* Visualização da ficha do personagem
* Sistema de atributos

  * FOR (Força)
  * DES (Destreza)
  * INT (Inteligência)
  * HACK (Hackeamento)
* Visualização de missões disponíveis
* Execução de missões
* Sistema de perguntas e respostas
* Rolagem de dado D20
* Ganho e perda de XP
* Progressão de nível
* Chat em tempo real

### Mestre

* Gerenciamento de jogadores
* Visualização de personagens
* Atribuição de missões
* Controle Kanban

  * Backlog
  * Sprint
  * Concluído
* Cadastro de novas missões
* Controle da progressão dos jogadores

---

## Tecnologias Utilizadas

### Frontend

* React 19
* Vite
* React Router DOM
* Axios
* React Icons
* Tailwind CSS

### Backend

* Node.js
* Express
* Socket.IO
* Axios
* Bcrypt

### Persistência

* JSON Server

---

## Arquitetura

```text
Frontend (React)
        |
        v
Backend (Express)
        |
        v
JSON Server
```

---

## Estrutura do Projeto

```text
cyber_code_tcc
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│
├── backend
│   ├── server.js
│   └── db.json
│
└── README.md
```

---

## Instalação

### Backend

```bash
cd backend

npm install

node server.js
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

### JSON Server

```bash
npx json-server db.json --watch --port 3000
```

---

## Portas Utilizadas

| Serviço     | Porta |
| ----------- | ----- |
| Frontend    | 5173  |
| Backend     | 3001  |
| JSON Server | 3000  |

---

## Fluxo do Sistema

1. O Mestre cadastra ou atribui missões.
2. As missões entram no Backlog do jogador.
3. O Mestre move missões para Sprint.
4. O Jogador executa os desafios.
5. O sistema realiza a rolagem do D20.
6. O resultado gera recompensas ou penalidades.
7. XP e progressão são atualizados.
8. A missão é concluída.

---

## Funcionalidades Implementadas

* Autenticação de usuários
* Sistema de personagens
* Sistema de atributos
* Sistema de XP
* Sistema de níveis
* Cadastro de missões
* Kanban de missões
* Chat em tempo real
* Rolagem de dados
* Gamificação do aprendizado

---

## Autor

Victor

Projeto desenvolvido como Trabalho de Conclusão de Curso em Engenharia de Software.
