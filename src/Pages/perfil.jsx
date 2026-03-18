
import './perfil.css'
import './home.css'
import { useParams } from "react-router-dom"
import SideMenu from '../SideMenu';
import Header from '../Header';
import Footer from '../Footer';
import decodeToken from '../utils/tokenToJson';
import ConteudoPerfil from '../PerfilContainer';

export default function Perfil(){

    const token = decodeToken()
    const { id } = useParams();


    return(
        <div className='homeContainer'>
            <Header></Header>
            <SideMenu></SideMenu>
            <ConteudoPerfil></ConteudoPerfil>
            <Footer></Footer>
        </div>
    )
}