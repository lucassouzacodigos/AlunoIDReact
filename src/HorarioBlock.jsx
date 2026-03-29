

import './horarioblock.css'


function HorarioBlock({ponto}){



    return(
        <div className='divisao' style={{backgroundColor: ponto.action == "Entrada" ? '#86efac' : '#fca5a5'}}>
            <div>
                <p>{ponto.hora_ponto.slice(0, 5)}</p> 
                <p>{ponto.action}</p>
            </div>
        </div>
    )
}


export default HorarioBlock