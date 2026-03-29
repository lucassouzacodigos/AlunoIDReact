import EntradaSaidaCont from '../EntradaSaidaCont'
import './entradaSaida.css'
import { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import SideMenu from '../SideMenu'
import qrcode from '../assets/qr-code-default.png'
import ConteudoCarteirinha from '../ConteudoCarteirinha'
import catraca from '../assets/catracaIcon.png'
import decodeToken from '../utils/tokenToJson'
import { api } from '../utils/api'



function EntradaSaida(props){

    const token = decodeToken()

    return(
        <div className='homeContainer'>
            <Header nome={token.nome ||"Undefined"} userID={token.userID} title="Entrada" subtitle="E Saida" src={catraca} />
            <SideMenu />
            <EntradaSaidaCont />
            <Footer />
        </div>
    )
}

export default EntradaSaida


