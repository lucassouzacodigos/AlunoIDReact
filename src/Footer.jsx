
import './footer.css'
import logo from './assets/impressao-digital.png'
import notificacao from './assets/notificacao.png'
import pfp from './assets/jorge.png'
import decodeToken from './utils/tokenToJson'



function Footer(){
    const token = decodeToken()

    return(
            <div className={token?.tipo_usuario == "Admin" ? "footerContainerAdmin" : "footerContainer" }>
                <div className="footerBlock">
                    <p className="font">Ajuda:</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <p className="font">Requisição de Doação</p>
                    <br />
                    <p className="font">Informações de Contato</p>
                </div>
                <div className="footerBlock">
                    <p className="font">FAQ</p>
                    <br />
                    <p className="font">Politica de privacidade</p>
                    <br />
                    <br />
                    <p className="font">(11) 8922 4002</p>
                    <br />
                    <p className="font">Contato@AlunoID.com.br</p>
                </div>

            <div className='copyright'> Copyright © 2025 AlunoID. Todos os direitos Reservados Desenvolvido por equipe AlunoID</div>
            </div>

    )
}


export default Footer