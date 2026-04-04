
import InputNomeado from './Components/inputNomeado'
import InputRadio from './Components/inputRadio'
import iconEndereco from './assets/enderecoecontato.png' 
import iconInfo from './assets/dadosEscolares.png' 
import './conteudo.css'
import './index.css'
import './Pages/Cadastro.css'
import iconDados from './assets/dadosPessoais.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import decodeToken from './utils/tokenToJson'
import { api } from './utils/api'
import getEndereco from './utils/cep'
import defaultprofilepic from './assets/perfil-de-usuario.png'
import defaultfoto from './assets/perfil-de-usuario.png'
import LoadingScreen from './LoadingScreen'

//badges
import PiggyXP from './assets/piggyxpbadge.png'
import Studium from './assets/studiumbadge.png'
import FocoMais from './assets/foco+badge.png'
import IndieDecoy from './assets/indiedecoybadge.png'
import AlunoID from './assets/impressao-digital.png'
//----

export default function ConteudoPerfil({perfilID}){
    const token = decodeToken()
    const [dadosAluno, setDadosAluno] = useState()
    const [endereco, setEndereco] = useState()

    async function getUserDetails(){
        const res = await api.get(`controle/getaluno/${perfilID}`)
        const data = res.data
        return data
    }

    useEffect(() => {
        async function firstpass(){
            const dados = await getUserDetails()
            setDadosAluno(dados)
            const getcep = await getEndereco(dados.cep)
            setEndereco(getcep)
        }
        firstpass()
    }, [])




    if(!dadosAluno){
        return <LoadingScreen/>
    }



    return(
        <div className="conteudoContainer" style={{flexDirection:"column", flexWrap:'nowrap', overflow:"auto"}}>
            
            <div className='blocoDeInfo' style={{height: '750px'}}>
                <div style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"start"}}>
                    <img className='underShadow fotoPerfil' src={`/rostos/${dadosAluno.nome}/${dadosAluno?.cpf}.png`} ></img>
                    
                    {/* BADGES */}
                    <div className='badges' style={{paddingTop:25}}>
                        <div className='badgeIconContainer flex-center'><img className='badgeIcon' src={PiggyXP}></img></div>
                        <div className='badgeIconContainer flex-center'><img className='badgeIcon' src={AlunoID}></img></div>
                        <div className='badgeIconContainer flex-center'><img className='badgeIcon' src={Studium}></img></div>
                        <div className='badgeIconContainer flex-center'><img className='badgeIcon' src={IndieDecoy}></img></div>
                        <div className='badgeIconContainer flex-center'><img className='badgeIcon' src={FocoMais}></img></div>
                    </div>

                </div>
                <div className='tituloBloco'><p>Dados Pessoais: </p> <img className='titulo-icon' src={iconDados} />  </div>
                <InputNomeado readonly={true} value={dadosAluno?.nome} titulo="Nome Completo:" espacodireita='50px' tamanhoBarra="580px" />
                <InputNomeado readonly={true} value={dadosAluno?.data_nasc} tipo="date" titulo="Data de Nasc.:" espacodireita='150px' tamanhoBarra="300px" />
                <InputNomeado readonly={true} value={dadosAluno?.email} titulo="Email" tamanhoBarra="700px"/>
                <InputNomeado readonly={true} value={dadosAluno?.cpf} titulo="C.P.F.:" espacodireita='50px' tamanhoBarra="300px" />
                <InputNomeado readonly={true} value={dadosAluno?.rg} titulo="R.G." espacodireita='50px' tamanhoBarra="300px" />

            </div>

            <div className='blocoDeInfo' style={{height: '350px', marginBottom:20}}>
                <div className='tituloBloco'><p>Endereço e contato: </p> <img className='titulo-icon' src={iconEndereco} />  </div>

                <InputNomeado readonly={true} value={dadosAluno?.cep} titulo="CEP:" espacodireita="50px"/>
                <InputNomeado readonly={true} value={endereco?.logradouro} titulo="Rua:" espacodireita="50px" tamanhoBarra="500px"/>
                <InputNomeado readonly={true} value={dadosAluno?.numero_casa} titulo="Numero:" espacodireita="50px" tamanhoBarra="110px"/>
                <InputNomeado readonly={true} value={endereco?.bairro} titulo="Bairro:" espacodireita="50px" tamanhoBarra="300px"/>
                <InputNomeado readonly={true} value={endereco?.localidade} titulo="Cidade:" espacodireita="50px" tamanhoBarra="300px"/>
            </div>

            {/* DADOS ESCOLARES */}
            <div className='blocoDeInfo' style={{height: '300px', marginBottom:30}}>
                <div className='tituloBloco'><p>Dados Escolares:</p> <img className='titulo-icon' src={iconInfo} />  </div>

                <InputNomeado readonly={true} value={dadosAluno?.aluno.serie} titulo="Serie:" />
                <InputNomeado readonly={true} value={dadosAluno?.aluno.turma} titulo="Turma:" tamanhoBarra="250px"/>
                <InputNomeado readonly={true} value={dadosAluno?.aluno.modalidade_ensino} titulo="Modalidade de ensino:" tamanhoBarra="300px" />
                <InputNomeado readonly={true} value={dadosAluno?.aluno.turno} titulo="Turno:" />
                {dadosAluno.aluno.necessidades_desc && <InputNomeado readonly={true} value={dadosAluno?.aluno.necessidades_desc} titulo="Necessidades Especiais: " tamanhoBarra="450px" espacodireita="0px"/>}
                
            </div>

        </div>
    )
}