import '../Pages/Cadastro.css'
import iconDados from '../assets/dadosPessoais.png'
import iconEndereco from '../assets/enderecoecontato.png' 
import iconInfo from '../assets/dadosEscolares.png' 
import InputNomeado from './inputNomeado'
import InputRadio from './inputRadio'
import { use, useRef, useState } from 'react'
import App from '../App'
import getCep from '../utils/cep'
import CadastroRosto from './FaceLogin'
import FaceLogin from './FaceLogin'







export default function cadastroAluno(){




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
    
    const [cameraOpen, setCameraOpen] = useState(false)

    const completarEndereco = async () => {
        if (!cep || cep.length != 8){
            console.log("invalido")
            return
        }

        const enderecoInfo = await getCep(cep)
        console.log(enderecoInfo)
        setRua(enderecoInfo.logradouro)
        setBairro(enderecoInfo.bairro)
        setCidade(enderecoInfo.localidade)
    }



    const fetchCadastroAluno = async () => {
        await fetch('http://localhost:3333/cadastro/aluno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                nasc,
                email,
                cpf,
                rg,
                sexo,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                complemento,
                serie,
                turma,
                modalidade,
                turno,
                necessidades,
                necessidades_desc
            })
        })

        
    }
    
    const refFoto = useRef()

    const esperarFoto = async () => {
        setCameraOpen(true)
    }
    
    const enviarCadastroAoBackend = async () => {
        refFoto.current.tirarFoto()
        await fetchCadastroAluno()
    }



    return(
        <div className='cadastroContainer flex-center' style={{justifyContent:"start"}}>

                    

                    {/* DADOS PESSOAIS */}
                    <div className='blocoDeInfo' style={{height: '350px'}}>
                        <div className='tituloBloco'><p>Dados Pessoais: </p> <img className='titulo-icon' src={iconDados} />  </div>
                        <InputNomeado onChange={setNome} titulo="Nome Completo:" espacodireita='50px' tamanhoBarra="580px" />
                        <InputNomeado onChange={setNasc} tipo="date" titulo="Data de Nasc.:" espacodireita='150px' tamanhoBarra="300px" />
                        <InputNomeado onChange={setEmail} titulo="Email" tamanhoBarra="700px"/>
                        <InputNomeado onChange={setCpf} titulo="C.P.F.:" espacodireita='50px' tamanhoBarra="300px" />
                        <InputNomeado onChange={setRg} titulo="R.G." espacodireita='50px' tamanhoBarra="300px" />


                        <InputRadio onChange={setSexo} val={sexo} option1="Feminino" option2="Masculino" titulo="Sexo:" funcao="sexo" espacodireita="1px" tamanhoBarra="" />                        
                    </div>





                    {/* ENDEREÇO E CONTATO */}
                    <div className='blocoDeInfo' style={{height: '350px'}}>
                        <div className='tituloBloco'><p>Endereço e contato: </p> <img className='titulo-icon' src={iconEndereco} />  </div>
        
                        <InputNomeado  onChange={setCep}  titulo="CEP:" espacodireita="50px" perdeufoco={completarEndereco}/>
                        <InputNomeado value={rua} onChange={setRua} titulo="Rua:" espacodireita="50px" tamanhoBarra="500px"/>
                        <InputNomeado value={numero} onChange={setNumero} titulo="Numero:" espacodireita="50px" tamanhoBarra="110px"/>
                        <InputNomeado value={bairro} onChange={setBairro} titulo="Bairro:" espacodireita="50px" tamanhoBarra="300px"/>
                        <InputNomeado value={cidade} onChange={setCidade} titulo="Cidade:" espacodireita="50px" tamanhoBarra="300px"/>
                        <InputNomeado onChange={setComplemento} titulo="Complemento:" espacodireita="50px" tamanhoBarra="200px"/>
                    </div>

                    





                    {/* DADOS ESCOLARES */}
                    <div className='blocoDeInfo' style={{height: '300px'}}>
                        <div className='tituloBloco'><p>Dados Escolares:</p> <img className='titulo-icon' src={iconInfo} />  </div>
        
                        <InputNomeado onChange={setSerie}  titulo="Serie:" />
                        <InputNomeado onChange={setTurma}  titulo="Turma:" tamanhoBarra="250px"/>
                        <InputNomeado onChange={setModalidade}  titulo="Modalidade de ensino:" tamanhoBarra="300px" />
                        <InputNomeado onChange={setTurno}  titulo="Turno:" />

                        <InputRadio value={necessidades} onChange={setNecessidade}  titulo="Necessidades especiais?:" />

                        <InputNomeado onChange={setNecessidade_desc} titulo="Se sim, Quais:" tamanhoBarra="450px" espacodireita="0px"/>
                    </div>

                    {cameraOpen && 
                    <div className='flex-center' style={{flexDirection:"column"}}>
                        <FaceLogin triggerCadastro={enviarCadastroAoBackend} ref={refFoto} cpfform={cpf} nome={nome}/>
                    </div>
                    }


                    
        
                    {!cameraOpen && <button className='BotaoAdicionar' onClick={esperarFoto} >Proximo Passo</button>}
        </div>
    )
}