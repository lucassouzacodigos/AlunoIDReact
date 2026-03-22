
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



export default function ConteudoPerfil(){
    const token = decodeToken()
    const [dadosAluno, setDadosAluno] = useState()
    const [endereco, setEndereco] = useState()

    async function getUserDetails(){
        const res = await api.get(`controle/getaluno/${token.userID}`)
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








    return(
        <div className="conteudoContainer" style={{flexDirection:"column", flexWrap:'nowrap', overflow:"auto"}}>
            
            <div className='blocoDeInfo' style={{height: '350px', alignItems:'center', justifyContent:'center'}}>
                <img src={`/rostos/${token.nome}/${dadosAluno?.cpf}.png`} style={{height:200, width:200, borderRadius:2002, objectFit:"cover"}}></img>
            </div>


            <div className='blocoDeInfo' style={{height: '350px'}}>
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

        </div>
    )
}