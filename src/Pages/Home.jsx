import { useState } from 'react'
import './home.css'
import Header from '../Header'
import Footer from '../Footer'
import SideMenu from '../SideMenu'
import Conteudo from '../Conteudo'
import ConteudoAdmin from '../ConteudoAdmin'
import qrcode from '../assets/qr-code-default.png'
import decodeToken from '../utils/tokenToJson'

function Home(){

    const token = decodeToken()

    return(
        <div className='homeContainer'>
            <Header  title="Acesse seu" subtitle="QR CODE" src={qrcode}/>
            <SideMenu />
            {token.tipo_usuario == "Admin" ? <ConteudoAdmin/> : <Conteudo/>}
            <Footer />
        </div>

    )
}

export default Home