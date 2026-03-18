
import InputNomeado from './Components/inputNomeado'
import InputRadio from './Components/inputRadio'
import iconEndereco from './assets/enderecoecontato.png' 
import iconInfo from './assets/dadosEscolares.png' 
import './conteudo.css'
import './index.css'
import './Pages/Cadastro.css'
import iconDados from './assets/dadosPessoais.png'
import { useState } from 'react'





export default function ConteudoPerfil(){

    const [nome, setNome] = useState(null)
    const [nasc, setNasc] = useState(null)
    const [email, setEmail] = useState(null)
    const [cpf, setCpf] = useState(null)
    const [rg, setRg] = useState(null)
    const [sexo, setSexo] = useState("Masculino")


    const [cep, setCep] = useState(null)
    const [rua, setRua] = useState("")
    const [numero, setNumero] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [complemento, setComplemento] = useState(null)

    const [serie, setSerie] = useState(null)
    const [turma, setTurma] = useState(null)
    const [modalidade, setModalidade] = useState(null)
    const [turno, setTurno] = useState(null)
    const [necessidades, setNecessidade] = useState(false)
    const [necessidades_desc, setNecessidade_desc] = useState(null)

    return(
        <div className="conteudoContainer" style={{flexDirection:"column"}}>

            <div className='blocoDeInfo' style={{height: '350px'}}>
                <div className='tituloBloco'><p>Dados Pessoais: </p> <img className='titulo-icon' src={iconDados} />  </div>
                <InputNomeado  titulo="Nome Completo:" espacodireita='50px' tamanhoBarra="580px" />
                <InputNomeado  tipo="date" titulo="Data de Nasc.:" espacodireita='150px' tamanhoBarra="300px" />
                <InputNomeado  titulo="Email" tamanhoBarra="700px"/>
                <InputNomeado  titulo="C.P.F.:" espacodireita='50px' tamanhoBarra="300px" />
                <InputNomeado  titulo="R.G." espacodireita='50px' tamanhoBarra="300px" />


                <InputRadio val={sexo} option1="Feminino" option2="Masculino" titulo="Sexo:" funcao="sexo" espacodireita="1px" tamanhoBarra="" />                        
            </div>

             <div className='blocoDeInfo' style={{height: '350px'}}>
                <div className='tituloBloco'><p>Endereço e contato: </p> <img className='titulo-icon' src={iconEndereco} />  </div>

                <InputNomeado    titulo="CEP:" espacodireita="50px"/>
                <InputNomeado value={rua}  titulo="Rua:" espacodireita="50px" tamanhoBarra="500px"/>
                <InputNomeado value={numero}  titulo="Numero:" espacodireita="50px" tamanhoBarra="110px"/>
                <InputNomeado value={bairro}  titulo="Bairro:" espacodireita="50px" tamanhoBarra="300px"/>
                <InputNomeado value={cidade}  titulo="Cidade:" espacodireita="50px" tamanhoBarra="300px"/>
                <InputNomeado titulo="Complemento:" espacodireita="50px" tamanhoBarra="200px"/>
            </div>

        </div>
    )
}