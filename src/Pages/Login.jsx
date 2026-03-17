import './Login.css'
import logoDigital from '../assets/impressao-digital.png'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginComRosto2 from '../Components/LoginComRosto2'
import {motion, AnimatePresence } from 'framer-motion'


//request do login




function Login(){

//request do login
    const [user, setUser] = useState("lucas@email.com")
    const [senha, setSenha] = useState(123)
    const [erroLogin, seterroLogin] = useState(false)
    const navigate = useNavigate()
    const [reconhecendoFacial, setReconhecendoFacial] = useState(false)

    const capturarEnter = (e) => {
        if (e.key === "Enter"){
            tentarLogar()
        }
    }

    const tentarLogar = async () => {
        const response = await fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                senha: senha
            })
        })
        console.log(response)
        
        if (!response.ok){
            seterroLogin(true)
            console.log("deu errado")
            return
        }
        
        const tokenJson = await response.json()
        if (tokenJson) {

        ///se o login der certo, seta o token no local storage
        localStorage.setItem("token", tokenJson.token);
        setReconhecendoFacial(true)
        
        // navigate("/")
        }

    }









/// Elemento react
    return(
        <div className='loginContainer flex-center'>

            <div className='mainBox flex-center'>

                <div className='logoDiv flex-center'>

                    <div className='logoText'>
                        <h2 className='texto1'>Aluno<span style={{color:'black'}}>ID</span></h2>
                    </div>

                    <img src={logoDigital}></img>
                </div>
                <div className='CPF-Senha'>
                    
                    <div className="flex-center campos">
                        <input  type="text" name="user" placeholder="E-mail/CPF" id="user" onChange={(e) => setUser(e.target.value)}></input>
                        <input onKeyDown={capturarEnter} type="password" name="senha" placeholder="Senha" id="senha" onChange={(e) => setSenha(e.target.value)}></input>
                        <button className='login-btn' onClick={tentarLogar}>ENTRAR</button>
                        <a href="google.com" id="esqueci-senha">Esqueci minha senha</a>


                    </div>
                    <AnimatePresence>
                    {reconhecendoFacial && <LoginComRosto2 onClose={() => setReconhecendoFacial(false)} info={user} />}
                    </AnimatePresence>

                    {erroLogin && <p className='erroLogin'>Login e/ou senha incorretos</p>}
                </div>

            </div>

        </div>
    )
}



export default Login