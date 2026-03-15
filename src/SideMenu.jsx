

import './SideMenu.css'
import MenuIcon from './MenuIcon'

import carteirinha from './assets/RGicon.png'
import catraca from './assets/catracaIcon.png'
import livro from './assets/livro.png'
import calendario from './assets/calendarioIcon.png'
import kevin from './assets/kevin.jpg'
import casinha from './assets/homeIcon.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'


function SideMenu(){


    
    const menuItems = [
    { name: "Inicio", image: casinha, targetLink: "/" },
    { name: "Carteirinha", image: carteirinha, targetLink: "/Carteirinha" },
    { name: "Entrada e Saida", image: catraca, targetLink: "/Horarios" },
    { name: "Anotações", image: livro, targetLink: "/Anotacoes" },
    { name: "Calendário", image: calendario, targetLink: "/calendario" },
    { name: "Cadastro", image: livro, targetLink: "/Cadastro"},
    { name: "DEBUG", targetLink: "/LoadingDebug" },
    { name: "Alunos", targetLink: "/Painel" },
    { name: "Login", targetLink: "/Login" },
    { name: "Facial", targetLink: "/facial" },
]


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