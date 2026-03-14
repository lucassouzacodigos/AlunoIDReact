import './anotationBlock.css'
import notasIcon from './assets/notinhasIcone.png'
import apagarNota from './assets/apagarnota.png'
import { useState } from 'react'

function AnotationBlock({cor, titulo, subtitulo, notaID, refresh}){

    const [confirma, setConfirma] = useState(false)

    const deletarNota = async (notaID) => {
        await fetch(`http://localhost:3333/controle/deletarnota/${notaID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        refresh()
        
    }


    return(
        <div className='itemListaNota' style={{backgroundColor: cor}}> 
            <div style={{height:"100%", display:"flex", alignItems:"start", justifyContent:"center", padding:5}}>
                            <img className='notinhaIcon' src={notasIcon}></img>
            </div>
            
            <div className='textos' >
                <p className='tituloNota bold'> {titulo} </p>
                <p className='subtituloNota bold' > {subtitulo} </p>
            </div>

            <div style={{height:"100%", display:"flex", alignItems:"start", justifyContent:"center", padding:10}}>
                <img onClick={() => deletarNota(notaID)} style={{height:50, width:50}} src={apagarNota}></img>
            </div>
        </div>
    )
}

export default AnotationBlock