import './conteudo.css'
import Bloco from './Bloco'
import carteirinhaBig from './assets/carteirinhaBig.png'
import catracaBig from './assets/catracaBig.png'
import BlocoCalendario from './BlocoCalendario'
import alunos from './assets/alunos.png'
import funcionarios from './assets/funcionarios.png'
import salas from './assets/salas.png'
import BlocoAnotacoes from './BlocoAnotacoes'


function ConteudoAdmin(){

    

    return(
        <div className='conteudoContainer'>
            <Bloco btnName="Acessar Agora" imagem={salas} titulo="Adicionar /Editar" qtd={50} subtitulo="Classes" urlClick="/painel"></Bloco>
            <Bloco btnName="Acessar Agora" imagem={funcionarios} titulo="Funcionários" qtd={50} subtitulo="Ativos" urlClick="/painel"></Bloco>
            <Bloco btnName="Acessar Agora" imagem={alunos} titulo="Acessar" qtd={50} subtitulo="Alunos" urlClick="/painel"></Bloco>
            <BlocoCalendario urlClick="/calendario"/>

        </div>
    )
}

export default ConteudoAdmin