import './conteudoAnotacoes.css'
import './bloco.css'
import livroBig from './assets/livroBig.png'
import AnotationBlock from './AnotationBlock'
import addNote from './assets/addNote.png'
import { useEffect, useState } from 'react'
import decodeToken from './utils/tokenToJson'
import CriadorDeNotas from './Components/CriadorDeNotas'








function conteudoAnotacoes() {

    const token = decodeToken()
    const [criadorNotaOpen, setCriaorNotaOpen] = useState(false)
    const [notas, setNotas] = useState([])


    async function getNotas(){
        const notas = await fetch(`http://localhost:3333/controle/getNotas/${token.userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await notas.json()
        setNotas(data)
    }



    useEffect(() => {
        getNotas()
    }, [])



    
    return (
        <div className='conteudoContainer'>
            <div className='anotacoesConteudoContainer' style={{backgroundColor:"rtans"}}>
                <div className='topRow'>
                    <h1 className='subtitulo'>Anotações: </h1>
                    
                    <img src={livroBig}></img>
                </div>

                <div className='listaDeNotas' style={{backgroundColor:"trans"}}>
                    {notas.length == 0 && <div><p style={{fontWeight:"bold", fontSize:20}}>Você ainda nao tem notas, Crie uma abaixo</p></div>}

                    {notas?.map((nota) => {
                        return(
                            // <div>{nota.anotacao_id} {nota.conteudo} {nota.userID}</div>
                            <AnotationBlock notaID={nota.anotacao_id} key={nota.anotacao_id} cor={nota.cor} titulo={nota.titulo} subtitulo={nota.conteudo} />
                        )
                    }) }
                    

                    {criadorNotaOpen && <CriadorDeNotas toggle={() => setCriaorNotaOpen(false)} />}

                </div>

                <div className='addNotas' style={{cursor:"pointer"}} onClick={() => setCriaorNotaOpen((cur) => !cur)}>
                    <p className='bold'>Adicionar notas</p> <img src={addNote} style={{height:35, width:35}}></img> 
                </div>

            </div>
        </div>
    )
}

export default conteudoAnotacoes
