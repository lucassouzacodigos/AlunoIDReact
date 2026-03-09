import { useState } from 'react'
import './home.css'
import Header from '../Header'
import Footer from '../Footer'
import SideMenu from '../SideMenu'
import Conteudo from '../Conteudo'
import qrcode from '../assets/qr-code-default.png'
import decodeToken from '../utils/tokenToJson'
import ConteudoPainel from '../ConteudoPainel'

function Painel(){

    const token = decodeToken()

    return(
        <div className='homeContainer'>
            <Header  title="Acesse seu" subtitle="QR CODE" src={qrcode}/>
            <SideMenu />
            <ConteudoPainel />
            <Footer />
        </div>

    )
}

export default Painel