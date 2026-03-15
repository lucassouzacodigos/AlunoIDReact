import './conteudo.css'
import Bloco from './Bloco'
import carteirinhaBig from './assets/carteirinhaBig.png'
import catracaBig from './assets/catracaBig.png'
import BlocoCalendario from './BlocoCalendario'
import BlocoAnotacoes from './BlocoAnotacoes'
import { useState, useEffect } from 'react'
import aluno from '../Server/entities/aluno'
import Flex from 'react-calendar/dist/Flex.js'
import masculino from '../src/assets/masculino.png'
import feminino from '../src/assets/feminino.png'
import { Column } from 'typeorm'
import InputRadio from './Components/inputRadio'
import DivisaoDeLinha from './Components/DivisaoDeLinha'
import './index.css'
import Header from './Header'
import usuario from '../Server/entities/usuario'
import { motion, stagger } from 'framer-motion'


function Conteudo(){

    const [alunos, setAlunos] = useState([])
    const [senha, setSenha] = useState('')
    const [pesquisa, setPesquisa] = useState('')
    const [emFoco, setEmFoco] = useState(null)

    const deleteUser = async (userID) => {
        const deletar = await fetch('http://localhost:3333/cadastro/aluno', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID
            })
        })
        console.log(`Usuario ${userID} deletado`)
        fetchAlunos()
    }




    const updateSenha = async (userID) => {
        const attsenha = await fetch('http://localhost:3333/cadastro/aluno', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID,
                novaSenha: senha
            })
        })
        fetchAlunos()
    }


    useEffect(() => {
        fetchAlunos()
    }, [])


    const fetchAlunos = async () => {
        const alunos = await fetch('http://localhost:3333/controle/alunos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

    const data = await alunos.json()
    console.log("alunos retornados")
    const toArray = [...data]
    setAlunos(toArray)
    console.log(toArray)
}

    const queryDeBusca = async (query) => {
        if(query == "" || query == null){
            fetchAlunos()
        }

            const alunos = await fetch(`http://localhost:3333/controle/busca/${query.toLowerCase()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await alunos.json()
            console.log(data)
            setAlunos(data)
        }

    return(
        <div className='conteudoContainer' style={{backgroundColor:"lightblue", borderRadius:10, alignItems:"start"}}>

            <div>BARRA DE PESQUISA {emFoco} <input type='text' onChange={(e) => queryDeBusca(e.target.value)}></input> <button onClick={queryDeBusca}>teste</button> </div>

            <motion.div className='containerDaLista' style={{backgroundColor:"#F5F5F5"}}
                        variants={{
                            hidden: {opacity:0, },
                            show:{opacity:1, transition: {type:"tween", duration: 0.05, delayChildren:stagger(0.01)}}
                        }}
                        initial="hidden"
                        animate="show"
            >
                <div>HEADER</div>
                {alunos?.map((aluno)=> {
                    const isOpen = emFoco === aluno.id_usuario

                    return(
                        <motion.div 
                        className={`linhaIndividual ${isOpen? "linhaEmFoco" : ""}`} 
                        onClick={() => setEmFoco(aluno.id_usuario)} 
                        key={aluno.id_usuario}
                        variants={{
                            hidden: {opacity:0, marginTop:20, width:"1%"},
                            show:{opacity:1, marginTop:0, width:"100%", transition: {type:"tween", duration: 0.05}}
                        }}
                        style={{opacity:0}}
                        >

                                <div className='genderIcon'>
                                    {aluno.sexo == "H" && <img src={masculino}></img>}
                                    {aluno.sexo == "M" && <img src={feminino}></img>}
                                </div>

                                <DivisaoDeLinha tamanhodafonte={24} cor="#1C3D6E" texto={aluno.nome}></DivisaoDeLinha>
                                <DivisaoDeLinha tamanhodafonte={24} cor="#1C3D6E" texto={aluno.cpf}></DivisaoDeLinha>
                                {/* <DivisaoDeLinha tamanhodafonte={24} cor="#1C3D6E" texto={aluno.data_nasc}></DivisaoDeLinha> */}
                                <DivisaoDeLinha tamanhodafonte={24} cor="#1C3D6E" texto={aluno.dentro_da_escola ? <p style={{backgroundColor:"green"}}>on</p> : <p style={{backgroundColor:"red"}}>off</p> }></DivisaoDeLinha>

                                {isOpen && <>
                                <DivisaoDeLinha tamanhodafonte={18} desc="Modalidade: " texto={aluno.aluno.modalidade_ensino}></DivisaoDeLinha>
                                <DivisaoDeLinha tamanhodafonte={18} desc="E-Mail: " texto={aluno.email}></DivisaoDeLinha>
                                <DivisaoDeLinha tamanhodafonte={18} desc="Sexo: " texto={aluno.sexo == "H"? "Masculino" : "Feminino"}></DivisaoDeLinha>
                                </>
                                }

                                {/* <button style={{width:50}} onClick={() => deleteUser(aluno.id_usuario)}>Del</button>
                                <button style={{width:50}} onClick={() => updateSenha(aluno.id_usuario)}>Att Senha</button>
                                <input placeholder='nova senha' onChange={(e) => setSenha(e.target.value)}></input> */}

                        </motion.div>

                    )
                })}
                
            </motion.div>

        </div>
    )
}

export default Conteudo