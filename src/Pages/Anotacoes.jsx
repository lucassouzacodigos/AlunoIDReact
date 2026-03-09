import './anotacoes.css'
import '../index.css'
import Header from '../Header'
import Footer from '../Footer'
import SideMenu from '../SideMenu'
import ConteudoCarteirinha from '../ConteudoCarteirinha'
import ConteudoAnotacoes from '../ConteudoAnotacoes'
import livrinho from "../assets/livro.png"
import decodeToken from '../utils/tokenToJson'


function Anotacoes(){

    const token = decodeToken()

    return(
        <div className='anotacoesContainer'>
            <Header  subtitle="Anotações" src={livrinho} />
            <SideMenu />
            <ConteudoAnotacoes />
            <Footer />
        </div>
    )
}

export default Anotacoes
