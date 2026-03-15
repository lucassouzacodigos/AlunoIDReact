import './blocoAnotacoes.css'
import './bloco.css'
import BarraNotinhasBloco from './BarraNotinhasBloco'
import livroBig from './assets/livroBig.png'
import { Link } from 'react-router-dom'

function BlocoAnotacoes({urlClick}){
    return(
        <div className='bloco blocoAnotacoes'>
            <Link to={urlClick} style={{width:"100%", height:"100%", position:"absolute", top:0, backgroundColor:"transparent", zIndex:1000}}></Link>
            <div className='topdiv'>
                <p className='titulo bold margin-20'>Anotações:</p> <img className='livroBig' src={livroBig}></img>
            </div>

            <div className='bottomDiv'>
                <BarraNotinhasBloco cor="#EA4335" tamanho="70%" textContent="Estudar Para a Prova De Fisosofia"/>
                <BarraNotinhasBloco cor="#8245F4" tamanho="92%" textContent="Atividade Feita Na Aula De Matematica"/>
                <BarraNotinhasBloco cor="#FBBC05" tamanho="92%" textContent="Chegar Mais Cedo Na Quarta"/>

                <div className='addNotas bold'>
                    Adicionar Anotações <p className='addIcon'>+</p>
                </div>
                
            </div>
        </div>
    )
}

export default BlocoAnotacoes