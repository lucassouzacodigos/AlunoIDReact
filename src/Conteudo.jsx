import './conteudo.css'
import Bloco from './Bloco'
import carteirinhaBig from './assets/carteirinhaBig.png'
import catracaBig from './assets/catracaBig.png'
import BlocoCalendario from './BlocoCalendario'
import BlocoAnotacoes from './BlocoAnotacoes'


function Conteudo(){
    return(
        <div className='conteudoContainer'>
            <Bloco btnName="Acessar Agora" imagem={carteirinhaBig} titulo="Acesse sua" subtitulo="Carteira de Estudante" urlClick="/carteirinha"></Bloco>
            <Bloco btnName="Acessar Agora" imagem={catracaBig} titulo="Registro" subtitulo="Entrada e Saida" urlClick="/Horarios"></Bloco>
            <BlocoAnotacoes urlClick="/anotacoes"/>
            <BlocoCalendario urlClick="/calendario"/>

        </div>
    )
}

export default Conteudo