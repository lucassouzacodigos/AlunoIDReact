import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import Carteirinha from './Pages/Carteirinha'
import Anotacoes from './Pages/Anotacoes.jsx'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import LoadingScreen from './LoadingScreen.jsx'
import EntradaSaida from './Pages/EntradaSaida.jsx'
import Login from './Pages/Login.jsx'
import Cadastro from './Pages/Cadastro.jsx'
import Painel from './Pages/Painel.jsx'
import CadastroRosto from './Components/FaceLogin.jsx'


let counter = 3;



const router = createBrowserRouter([
  {
    path : '/',
    element: <Home />
  },
  {
    path : '/Carteirinha',
    element: <Carteirinha />
  },
  {
    path : '/Anotacoes',
    element: <Anotacoes />
  },
  {
    path : '/Horarios',
    element : <EntradaSaida />
  },
  {
    path : '/Login',
    element: <Login />
  },
  {
    path : '/Cadastro',
    element: <Cadastro/>
  },
  {
    path : '/Painel',
    element: <Painel/>
  },
  {
    path : '/Painel',
    element: <Painel/>
  },
  {
    path : '/cadastroRosto',
    element: <CadastroRosto/>
  },
])

function App() {
  


  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
