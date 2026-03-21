import '../Pages/cadastro.css'





export default function InputNomeado(props){
    return(
        <div className='inputComNome'>
            <p>{props.titulo}</p>
            <input readOnly={props.readonly} value={props.value} type={props.tipo} placeholder='. . .' onChange={(e) => props.onChange(e.target.value)} onBlur={props.perdeufoco} style={{marginRight: props.espacodireita || "50px", width: props.tamanhoBarra, fontSize:15, fontWeight:"bold",}}></input>
        </div>
    )
}





