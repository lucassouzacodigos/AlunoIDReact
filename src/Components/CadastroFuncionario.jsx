import '../Pages/Cadastro.css'
import iconDados from '../assets/dadosPessoais.png'
import iconEndereco from '../assets/enderecoecontato.png' 
import iconInfo from '../assets/dadosEscolares.png' 
import InputNomeado from './inputNomeado'
import InputRadio from './inputRadio'
import iconDadosProfissionais from '../assets/dadosprofissionais.png'
import { useState } from 'react'
import getCep from '../utils/cep'


import App from '../App'
import FaceLogin from './FaceLogin'



export default function cadastroFuncionario(){

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

    const [nome, setNome] = useState(null)
    const [nasc, setNasc] = useState(null)
    const [email, setEmail] = useState(null)
    const [cpf, setCpf] = useState(null)
    const [rg, setRg] = useState(null)
    const [sexo, setSexo] = useState("Masculino")


    const [cep, setCep] = useState(null)
    const [rua, setRua] = useState(null)
    const [numero, setNumero] = useState(null)
    const [bairro, setBairro] = useState(null)
    const [cidade, setCidade] = useState(null)
    const [complemento, setComplemento] = useState(null)

    const [cargo, setCargo] = useState(null)
    const [setor, setSetor] = useState(null)
    const [contrato, setContrato] = useState(null)
    const [registro, setRegistro] = useState(null)



    const fetchCadastroFuncionario = async () => {
        await fetch('http://localhost:3333/cadastro/funcionario', {
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
                cargo,
                setor,
                contrato,
                registro
            })
        })
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

                <InputNomeado onChange={setCep} titulo="CEP:" espacodireita="50px" perdeufoco={completarEndereco}/>
                <InputNomeado value={rua} onChange={setRua} titulo="Rua:" espacodireita="50px" tamanhoBarra="500px"/>
                <InputNomeado onChange={setNumero} titulo="Numero:" espacodireita="50px" tamanhoBarra="110px"/>
                <InputNomeado value={bairro} onChange={setBairro} titulo="Bairro:" espacodireita="50px" tamanhoBarra="300px"/>
                <InputNomeado value={cidade}onChange={setCidade} titulo="Cidade:" espacodireita="50px" tamanhoBarra="300px"/>
                <InputNomeado onChange={setComplemento} titulo="Complemento:" espacodireita="50px" tamanhoBarra="200px"/>
            </div>




            {/* {DADOS PROFISSIONAIS} */}
            <div className='blocoDeInfo' style={{height: '350px'}}>
                <div className='tituloBloco'>
                    <p>Dados profissionais: </p>
                    <img className='titulo-icon' src={iconDadosProfissionais} />  
                </div>

                <InputNomeado onChange={setCargo} titulo="Cargo / Função" tamanhoBarra="500px" />
                <InputNomeado onChange={setSetor} titulo="Setor / Departamento" tamanhoBarra="400px" />
                <InputNomeado onChange={setContrato} titulo="Tipo de contrato" tamanhoBarra="380px" />
                <InputNomeado onChange={setRegistro} titulo="N° do registro" tamanhoBarra="240px" />
            </div>

            <FaceLogin cpfform={cpf} nome={nome}/>


            <button className='BotaoAdicionar' onClick={fetchCadastroFuncionario} >ADICIONAR</button>


        </div>
    )
}