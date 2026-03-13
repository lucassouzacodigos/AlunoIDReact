
import './header.css'
import logo from './assets/impressao-digital.png'
import notificacao from './assets/notificacao.png'
import pfp from './assets/jorge.png'
import kevin from './assets/kevin.jpg'
import { useNavigate } from 'react-router-dom'
import decodeToken from './utils/tokenToJson'

function Header(props){

    const navigate = useNavigate();
    let token = decodeToken()
    if (token == {} || token == null){
        token = {
            "nome":"generico",
            "userID":1,
            "tipo_usuario":"Admin"
        }
    }
    const goToHome = () => {navigate('/')}

    return(
        <div className="headerContainer">
            <div onClick={goToHome} className='logoContainer'>
                <img src={logo} className='logoHome' />
                <h2><span className="blueFontLogo">Aluno</span>ID</h2>
            </div>

            <div className='centerContent'>
                <div className='text'>
                    <p className='title bold'>{props.title}</p>
                    <p className='subtitle bold'>{props.subtitle}</p>
                </div>
                <img className='imgcenter' src={props.src}></img>
            </div>
            <button style={{width:50, height:50}} onClick={() => console.log(token)}>print token to console</button>
            <div className='userMenu'>
                <img src={notificacao} className='notificacao' />

                <div className="userinfo">
                    <p className="bold">Seja Bem vindo!</p>
                    <p className="bold">{token?.nome}</p>
                </div>

                <img src={kevin} className='profilePicture'/>

            </div>
        </div>
    )
}

export default Header