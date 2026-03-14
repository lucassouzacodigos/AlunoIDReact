
import AnotationBlock from "./AnotationBlock"
import "./diaItem.css"
import { useState } from "react"



function DiaItem(props){

    const notas = props.notas
    const [hover, setHover] = useState(false)
    const notasFiltradas = [...notas].filter((nota) => {
        const dia = new Date(nota.data).getDate()
        return dia === props.diaNum - 1 
    })

    const hasEvent = (diaNum) => {
        return notasFiltradas.length > 0
    }

    const getCor = (diaNum) => {
        
    }



    return(
        <div>
            {/* ELEMENTO Q BROTA AO PASSAR O MOUSE EMCIMA */}
            {hover 
            && 
            <div className="hover" 
            style={{
                backgroundColor:"#4897d4", 
                position:"absolute",
                top:"-300%",
                left:"-120%",
                display:"flex",
                width:500,
                height:"auto",
                alignItems:"center",
                flexDirection:"column",
                borderRadius:15,
                padding:50,
                opacity:1
            }}>
                
                {notasFiltradas?.map((nota) => {
                    return(
                        <div>
                            <AnotationBlock notaID={nota.anotacao_id} key={nota.anotacao_id} cor={nota.cor} titulo={nota.titulo} subtitulo={nota.conteudo} />
                        </div>
                    )
                })}

            </div>
            }


            <div className="diaDiv bold" 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)} 
            style={{}}>
                <p style={{color: props.color, display:"flex", alignItems:"center", justifyContent:"center"}}>

                    {props.diaNum} 
                    {
                    hasEvent(props.diaNum) 
                    && 
                    <p style={{borderRadius:150, backgroundColor:props.corfundo, height:25, width:25, position:"absolute", opacity:0.4}}></p>
                    }
                    
                </p>
            </div>
        </div>
    )
}


export default DiaItem