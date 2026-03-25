



export default function DivisaoDeLinha(props){
    return(
        <div style={{backgroundColor:"transparent", 
        height:"auto", 
        width:"28%",
        display:"flex", 
        alignItems:"center", 
        marginRight:5, 
        marginLeft:5, 
        fontSize:props.tamanhodafonte, 
        fontWeight:"bold", 
        padding:5, 
        paddingLeft:2,
        marginLeft:props.marginLeft? props.marginLeft : 0,
        color:props.cor}}>
            <>{props.desc}{props.texto}</>
        </div>
    )
}
