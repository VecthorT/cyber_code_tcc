import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Mestre from "./pages/Mestre"
import Jogador from "./pages/Jogador"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/mestre" element={<Mestre />} />

        <Route path="/jogador" element={<Jogador />} />

      </Routes>

    </BrowserRouter>

  )

}

export default App