import '../Pages/anotacoes.css'
import { useState } from 'react'
import decodeToken from '../utils/tokenToJson'
import {motion, stagger} from 'framer-motion'



export default function CriadorDeNotas({toggle, refresh}){

    const token = decodeToken()
    const [titulo, setTitulo] = useState("")
    const [conteudo, setConteudo] = useState("")
    const [cor, setCor] = useState("#0079D9")

    const nada = () => {console.log("salve")}

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
        <motion.div className="criadorDeNotas" style={{}}
        variants={{
            hidden: {opacity:0, top:40},
            show: {opacity:1, top:0, transition: {ease:"linear", type:"decay", duration: 0.15, delayChildren:stagger(0.01)}},
        }}
        initial="hidden"
        animate="show"
        exit="hidden"
        >
            <div className='notaHeader' style={{}}>
                <button style={{height:50, width:50}} onClick={toggle}>X</button>
                <p>Criar nova anotação</p>
            </div>

            <div className='camposInput'>
                <p className='stringtitulo'>Escreva o titulo: </p>
                <input style={{marginBottom:15, padding:15}} onChange={(e) => setTitulo(e.target.value)} className='inputTitulo' type='text' placeholder='Titulo da nota'></input>

                <p className='stringtitulo'>Adicione sua anotação: </p>
                <textarea style={{padding:15}} onChange={(e) => setConteudo(e.target.value)} className='inputConteudo' type='text' placeholder='Escreva Aqui'></textarea>


                <button className='botaoSalvar'  onClick={salvarNota}>Salvar Nota</button>

            </div>
        </motion.div>
    )
}