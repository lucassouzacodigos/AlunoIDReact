import './conteudo.css'
import './conteudoCarteirinha.css'
import Bloco from './Bloco'
import carteirinhaBig from './assets/carteirinhaBig.png'
import catracaBig from './assets/catracaBig.png'
import kevin from './assets/kevin.jpg'
import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import InputRadio from './Components/inputRadio'


function ConteudoCarteirinha(){
    let cor = "black"
    let codeSize = 300;
    const carteirinhaHash = "kevinChupetaMonstro"


    const [qrCode, setQrCode] = useState(null);



    return (
        <div className='conteudoContainer'>
            <div className='blocoCarta flex-center'>
                <img className='cartaFoto' src={kevin}></img>

                <div className='cartaInfo'>
                    <ul>
                        <li><p className='infoTexts'>Kevin Valentim</p></li>
                        <li><p className='infoTexts'>ETEC Embu - Centro Paulo Souza</p></li>
                        <li><p className='infoTexts'>CPF: 123.456.789.01</p></li>
                        <li><p className='infoTexts'>RG: 56.015.854-1</p></li>
                        <li><p className='infoTexts'>Data de Nascimento: 01/01/0001</p></li>
                        <li><p className='infoTexts'>Matricula: 984984</p></li>
                    </ul>
                </div>
            </div>


            <div className='blocoCarta flex-center'>
                <div className='qrCodeContainer' >
                    <QRCodeSVG fgColor={cor} bgColor="transparent" size={codeSize} value={carteirinhaHash}/>
                </div>

            </div>
        </div>
    )
}

export default ConteudoCarteirinha