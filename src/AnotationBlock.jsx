import './anotationBlock.css'
import notasIcon from './assets/notinhasIcone.png'
import apagarNota from './assets/apagarnota.png'
import confirmar from './assets/confirma.png'
import negar from './assets/negar.png'
import { useState } from 'react'
import {motion, stagger} from 'framer-motion'


function AnotationBlock({cor, titulo, subtitulo, notaID, refresh, animate}){

    const [confirma, setConfirma] = useState(false)





    const deletarNota = async (notaID, confirmacao) => {
        setConfirma(true)
        if (confirmacao == true){
            await fetch(`http://localhost:3333/controle/deletarnota/${notaID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        refresh()
        }
        else{
            setConfirma(false)
        }
    }


    return(
        


        <motion.div className='itemListaNota' style={{backgroundColor: cor}}
        variants={animate? {
            before: {marginLeft:"-250%"},
            after: {marginLeft:"0%" , transition:{type:"tween", ease: [0.16, 1, 0.3, 1], duration: 2}}
        } : undefined}
        initial="before"
        animate="after"
        exit="before"
        > 
        
            <div style={{height:"100%", display:"flex", alignItems:"start", justifyContent:"center", padding:5}}>
                            <img className='notinhaIcon' src={notasIcon}></img>
            </div>
            
            <div className='textos' >
                <p className='tituloNota bold'> {titulo} </p>
                <p className='subtituloNota bold' > {subtitulo} </p>
            </div>

            <div style={{height:"100%", display:"flex", alignItems:"start", justifyContent:"center", padding:10}}>
                {!confirma && <img onClick={() => setConfirma(true)} style={{height:50, width:50}} src={apagarNota}></img>}
            </div>


        {confirma && <div className='confirma'>
            <div onClick={() => deletarNota(notaID, true)} className='flex-center' style={{backgroundColor:"red", height:"100%", width:"50%"}}><img src={confirmar}></img></div>
            <div onClick={() => deletarNota(notaID, false)} className='flex-center' style={{backgroundColor:"green", height:"100%", width:"50%"}}><img src={negar}></img></div>
        </div>}

        {/* <button style={{height:50, width:50}} onClick={() => (setConfirma(c => !c))}></button> */}
        </motion.div>
    )
}

export default AnotationBlock