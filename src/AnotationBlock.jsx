import './anotationBlock.css'
import notasIcon from './assets/notinhasIcone.png'
import apagarNota from './assets/apagarnota.png'
import confirmar from './assets/confirma.png'
import negar from './assets/negar.png'
import { useState } from 'react'
import {animateMini, AnimatePresence, motion, stagger} from 'framer-motion'


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
                <img onClick={() => setConfirma(true)} style={{height:50, width:50}} src={apagarNota}></img>
            </div>

        <AnimatePresence>
        {confirma && <motion.div className='confirma'
            variants={{
                before: {opacity: 0.3, right:-250},
                after: {opacity:1, right:0, transition: {type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.3}},
                sair: {opacity:0, right: -250}
            }}
            initial="before"
            animate="after"
            exit="sair"
        >
            <div onClick={() => deletarNota(notaID, true)} className='flex-center sim-nao' style={{backgroundColor:"green"}}>
                <img className='iconsConfirma' src={confirmar}></img>
            </div>
            <div onClick={() => deletarNota(notaID, false)} className='flex-center sim-nao'>
                <img className='iconsConfirma' src={negar}></img>
            </div>
        </motion.div>}
        </AnimatePresence>


        </motion.div>
    )
}

export default AnotationBlock