

import './SideMenu.css'
import MenuIcon from './MenuIcon'

import carteirinha from './assets/RGicon.png'
import catraca from './assets/catracaIcon.png'
import livro from './assets/livro.png'
import calendario from './assets/calendarioIcon.png'
import kevin from './assets/kevin.jpg'
import casinha from './assets/homeIcon.png'
import lista from './assets/listamento.png'
import alunos from './assets/alunos.png'
import funcionarios from './assets/funcionarios.png'
import salas from './assets/salas.png'
import alunosIcon from './assets/alunosicon.png'
import funcionariosIcon from './assets/funcionariosIcon.png'
import salasIcon from './assets/salasIcon.png'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import decodeToken from './utils/tokenToJson'
import aluno from '../Server/entities/aluno'


function SideMenu(){

    const token = decodeToken()
    
    let menuItems = []


    //LISTA MENU LATERAL DO ALUNO
    if (token.tipo_usuario != "Admin"){
    menuItems = [
        { name: "Inicio", image: casinha, targetLink: "/" },
        { name: "Carteirinha", image: carteirinha, targetLink: "/Carteirinha" },
        { name: "Entrada e Saida", image: catraca, targetLink: "/Horarios" },
        { name: "Anotações", image: livro, targetLink: "/Anotacoes" },
        { name: "Calendário", image: calendario, targetLink: "/calendario" },
        { name: "Cadastro", image: livro, targetLink: "/Cadastro"},
        { name: "DEBUG", targetLink: "/LoadingDebug" },
        { name: "Painel", image: lista, targetLink: "/Painel" },
        { name: "Login", targetLink: "/Login" },
        { name: "Facial", targetLink: "/facial" },
        ]
    } else {


    //LISTA MENU LATERAL DO ADMIN
    menuItems = [
        { name: "Inicio", image: casinha, targetLink: "/" },
        { name: "Funcionarios", image: funcionariosIcon, targetLink: "/painel"},
        { name: "Alunos", image: alunosIcon, targetLink: "/painel"},
        { name: "Classes", image: salasIcon, targetLink: "/painel"},
        { name: "Painel", image: lista, targetLink: "/Painel" },
        { name: "Calendário", image: calendario, targetLink: "/calendario" },
        { name: "Login", targetLink: "/Login" },
        { name: "Cadastro", image: livro, targetLink: "/Cadastro"},
        { name: "Anotações", image: livro, targetLink: "/Anotacoes" },



    ]
}




    const [selected, setSelected] = useState(null)
    




    return(
        <div className='sideMenuContainer'>
            <ul>
                {menuItems.map((item, index) => {
                    return(
                        <MenuIcon 
                        key={index} 
                        {...item} 
                        isSelected={selected === index}
                        onClick={() => setSelected(index)} />
                    )
                } )}
            </ul>
        </div>
    )
}

export default SideMenu