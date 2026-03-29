
import './header.css'
import logo from './assets/impressao-digital.png'
import logoAdmin from './assets/impressao-digital-admin.png'
import notificacao from './assets/notificacao.png'
import pfp from './assets/jorge.png'
import kevin from './assets/kevin.jpg'
import { useNavigate } from 'react-router-dom'
import decodeToken from './utils/tokenToJson'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from './utils/api'

function Header(props){

    const navigate = useNavigate();
    let token = decodeToken()
    const [cpf, setCpf] = useState('')

    if (token == {} || token == null){
        token = {
            "nome":"generico",
            "userID":1,
            "tipo_usuario":"Admin"
        }
    }
    useEffect(() => {
        async function getCpf(){
            const getcpf = await api.get(`/controle/${token.userID}/cpf`)
            setCpf(getcpf.data) 
        }
        getCpf()
    }, [])




    const goToHome = () => {navigate('/')}

    return(
        <div className="headerContainer">
            <div onClick={goToHome} className='logoContainer'>
                <img src={token.tipo_usuario == "Admin" ? logoAdmin : logo} className='logoHome' />
                <h2><span className="blueFontLogo">Aluno</span>ID</h2>
            </div>

            <div className='centerContent'>
                <div className='text'>
                    <p className='title bold'>{props.title}</p>
                    <p className='subtitle bold'>{props.subtitle}</p>
                </div>
                <img className='imgcenter' src={props.src}></img>
            </div>
            <div className='userMenu'>
                <img  onClick={() => console.log(token)} src={notificacao} className='notificacao' />

                <div className="userinfo">
                    <p className="bold">Seja Bem vindo!</p>
                    <p className="bold">{token?.nome}</p>
                </div>

                <img src={`/rostos/${token.nome}/${cpf}.png`} className='profilePicture'/>

            </div>
        </div>
    )
}

export default Header