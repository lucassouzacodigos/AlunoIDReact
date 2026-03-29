import { useEffect, useState } from 'react'
import HorarioBlock from './HorarioBlock'
import './Pages/entradaSaida.css'
import { api } from './utils/api'
import decodeToken from './utils/tokenToJson'
import LoadingScreen from './LoadingScreen'



function EntradaSaidaCont(props){

    const token = decodeToken()
    const [pontos, setPontos] = useState([]) 

    async function getHorarios(){

        setTimeout(async() => {
            const dados = await api.get(`/controle/gethorario/${token.userID}`)
            const parsed = dados.data
            setPontos(parsed)
            console.log(parsed)
            
        }, 500);

    }

    useEffect(() => {
        async function onLoad(){
            await getHorarios()
        }
        onLoad()
        
        
    }, [])

    
    const diasSorted = [...pontos].reduce((acc, pontoatual) =>{
            const data = pontoatual.data_atual

            if(!acc[data]){
                acc[data] = []
            }

            acc[data].push(pontoatual)
            return acc
        }, {})

    
    const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
]



    return(
        




        <div className='horariosContainer'>
            <div className='titulos flex-center'>
                    <h2>Registro de Entradas e Saidas</h2>
            </div>

                <div className='listaDeHorarios'>
                    {pontos.length == 0 && <><LoadingScreen></LoadingScreen> Carregando...</>}
                    
                    {Object.entries(diasSorted)
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([data, registros]) => {
                        const diaSemana = diasSemana[new Date(data + "T00:00:00").getDay()]
                        return(
                        <div key={data} className='blocoHorarioFundo'>
                            <div className='infoDiaMesSemana'>
                                <h3> {new Date(data + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</h3>
                                <h2>{diaSemana}</h2>
                            </div>

                            {registros.map((ponto) => (
                                <HorarioBlock 
                                    key={ponto.id_registro}
                                    ponto={ponto}
                                />
                            ))}
                        </div>
                    )})}
                <button className='BotaoAdicionar' onClick={() => console.log(`dias organizados ${JSON.stringify(diasSorted)}`)}>sorted days</button>
                </div>

        </div>
    )
}


export default EntradaSaidaCont