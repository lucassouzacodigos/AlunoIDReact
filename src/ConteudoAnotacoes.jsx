import './conteudoAnotacoes.css'
import './bloco.css'
import livroBig from './assets/livroBig.png'
import AnotationBlock from './AnotationBlock'
import addNote from './assets/addNote.png'
import { useEffect, useState } from 'react'
import decodeToken from './utils/tokenToJson'
import CriadorDeNotas from './Components/CriadorDeNotas'
import { AnimatePresence, motion, stagger } from 'motion/react'
import LoadingScreen from './LoadingScreen'







function conteudoAnotacoes() {

    const [loading, setLoading] = useState(true)
    const token = decodeToken()
    const [criadorNotaOpen, setCriaorNotaOpen] = useState(false)
    const [notas, setNotas] = useState([])


    async function getNotas(){
        setLoading(true)
        setTimeout(async () => {
            const notas = await fetch(`http://localhost:3333/controle/getNotas/${token.userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await notas.json()
            setNotas(data)
            console.log(data)  
            setLoading(false)
        }, 600);
    }



    useEffect(() => {
        getNotas()
    }, [])


    if (loading){
        return <LoadingScreen></LoadingScreen>
    }

    
    return (
        <div className='conteudoContainer'>
            <motion.div className='anotacoesConteudoContainer' style={{backgroundColor:"transparent"}}
            variants={{
                before: {opacity:1},
                after: {transition:{type:"tween", ease:"easeOut", duration:stagger(0.1)}}
            }}
            initial="before"
            animate="after"
            >
                <div className='topRow'>
                    <h1 className='subtitulo'>Anotações: </h1>
                    
                    <img src={livroBig}></img>
                </div>

                <motion.div className='listaDeNotas' style={{backgroundColor:"transparent", overflowX:"hidden"}}
                variants={{
                before: {opacity:1},
                after: {transition:{type:"tween", ease:"easeOut", delayChildren:stagger(0.1)}}
                }}
                initial="before"
                animate="after"
                >
                    {notas.length == 0 && <div><p style={{fontWeight:"bold", fontSize:20}}>Você ainda nao tem notas, Crie uma abaixo</p></div>}

                    <AnimatePresence>
                    {notas?.map((nota) => {
                        return(
                            // <div>{nota.anotacao_id} {nota.conteudo} {nota.userID}</div>
                            <AnotationBlock animate={true} refresh={() => getNotas()} notaID={nota.anotacao_id} key={nota.anotacao_id} cor={nota.cor} titulo={nota.titulo} subtitulo={nota.conteudo} />
                        )
                    }) }
                    </AnimatePresence>
                    
                    <AnimatePresence>
                    {criadorNotaOpen && <CriadorDeNotas refresh={() => getNotas()} toggle={() => setCriaorNotaOpen(false)} />}
                    </AnimatePresence>

                </motion.div>

                <div className='addNotas' style={{cursor:"pointer"}} onClick={() => setCriaorNotaOpen((cur) => !cur)}>
                    <p className='bold'>Adicionar notas</p> <img src={addNote} style={{height:35, width:35}}></img> 
                </div>

            </motion.div>
        </div>
    )
}

export default conteudoAnotacoes
