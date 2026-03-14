import { useSearchParams } from 'react-router-dom'
import '../Pages/anotacoes.css'
import { useState } from 'react'
import decodeToken from '../utils/tokenToJson'



export default function CriadorDeNotas({toggle, refresh}){

    const token = decodeToken()
    const [titulo, setTitulo] = useState("")
    const [conteudo, setConteudo] = useState("")
    const [cor, setCor] = useState("#0079D9")

    const salvarNota = async () => {
        await fetch(`http://localhost:3333/controle/salvarnota/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: token.userID,
                titulo: titulo,
                conteudo: conteudo,
                cor: cor
            })
        })
        refresh()
        toggle()


    }



    return(
        <div className="criadorDeNotas">
            <div className='notaHeader' style={{backgroundColor:"red", width:"90%", height:"20%"}}>
                <button style={{height:50, width:50}} onClick={toggle}>X</button>
            </div>

            <div className='camposInput'>
                <p className='stringtitulo'>Escreva o titulo: </p>
                <input onChange={(e) => setTitulo(e.target.value)} className='inputTitulo' type='text' placeholder='Titulo da nota'></input>

                <p className='stringtitulo'>Adicione sua anotação: </p>
                <input onChange={(e) => setConteudo(e.target.value)} className='inputConteudo' type='text' placeholder='Escreva Aqui'></input>


                <button style={{height:50, width:50}} onClick={salvarNota}>Salvar Nota</button>

            </div>
        </div>
    )
}