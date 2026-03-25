import "../conteudo.css"
import '../Pages/Cadastro.css'
import Bloco from "../Bloco"
import BlocoAnotacoes from "../BlocoAnotacoes"
import {  useState } from "react"
import CadastroSALA from "./cadastroSALA"
import CadastroFuncionario from "./CadastroFuncionario"
import CadastroVisitante from "./CadastroVisitante"
import CadastroAluno from "./CadastroAluno"
import InputNomeado from "./inputNomeado"


export default function ConteudoCadastro(){

    const [tab, setTab] = useState('sala')




    return(
        <div className="conteudoContainer align-start">
            <div className='cadastroHeader flex-center'>
                <div className={tab == 'sala' ? 'option-selected' : 'option'} onClick={() => setTab('sala')} ><div className="optionTAB">Cadastro de Salas</div></div>
                <div className={tab == 'aluno' ? 'option-selected' : 'option'} onClick={() => setTab('aluno')} ><div className="optionTAB">Cadastro de Alunos</div></div>
                <div className={tab == 'func' ? 'option-selected' : 'option'} onClick={() => setTab('func')} ><div className="optionTAB">Cadastro de Funcionários</div></div>
                <div className={tab == 'visita' ? 'option-selected' : 'option'} onClick={() => setTab('visita')} ><div className="optionTAB">Cadastro de visitante</div></div>
            </div>
                
            {tab == "sala" && <CadastroSALA/>}
            {tab == "aluno" && <CadastroAluno/>}
            {tab == "func" && <CadastroFuncionario/>}
            {tab == "visita" && <CadastroVisitante/>}


        </div>
    )
}