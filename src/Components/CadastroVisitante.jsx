import '../Pages/Cadastro.css'
import InputNomeado from './inputNomeado'
import { useState, useRef } from 'react'
import FaceLogin from './FaceLogin'



export default function CadastroVisitante(){

    const [nome, setNome] = useState("")
    const [cameraOpen, setCameraOpen] = useState(false)

    const refFoto = useRef()

    const esperarFoto = async () => {
        setCameraOpen(true)
    }
    
    const enviarCadastroAoBackend = async () => {
        refFoto.current.tirarFoto()
        await fetchCadastroAluno()
    }

        const fetchCadastroAluno = async () => {
        await fetch('http://localhost:3333/cadastro/aluno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                nasc: "0000-00-00",
                email: `${nome.replace(/\s+/g, "").toLowerCase()}@etec.com`,
                cpf: "00000000000",
                rg: "000000000",
                sexo: "XXX",
                cep: "00000000",
                rua: "Rua Exemplo",
                numero: "000",
                bairro: "Bairro Exemplo",
                cidade: "Cidade Exemplo",
                complemento: "Complemento Exemplo",
                serie: 0,
                turma: 0,
                modalidade: "XXX",
                turno: "XXX",
                necessidades: true,
                necessidades_desc: "XXX"
            })
        })

        
    }

    return(
        <div className='cadastroContainer flex-center' style={{height:"90%"}}>
                {
                !cameraOpen &&
                <button className='BotaoAdicionar' onClick={() => setCameraOpen(!cameraOpen)}>Abrir Câmera</button>
                }

                {
                cameraOpen && 
                    <div className='blocoDeInfo flex-center'>

                        <InputNomeado titulo="Digite seu Nome:" espacodireita="0px" tamanhoBarra="800px" onChange={setNome}/>

                        <div className='flex-center' style={{flexDirection:"column"}}>
                            <FaceLogin triggerCadastro={enviarCadastroAoBackend} ref={refFoto} cpfform={nome} nome={nome}/>
                        </div>
                    </div>
                }
        </div>
    )
}