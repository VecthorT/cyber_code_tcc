import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Mestre from "./pages/Mestre"
import Jogador from "./pages/Jogador"
import RotaProtegida from "./routes/RotaProtegida"
import Cadastro from "./pages/Cadastro"
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={
            <Login/>
            }/>
        <Route path="/mestre" element={
          <RotaProtegida>
            <Mestre />
          </RotaProtegida>
          } />
        <Route path="/jogador" element={
          <RotaProtegida>
            <Jogador />
          </RotaProtegida>
          } />
        <Route path="/cadastro" element={
          <Cadastro />
        }/>
      </Routes>

    </BrowserRouter>

  )

}

export default App