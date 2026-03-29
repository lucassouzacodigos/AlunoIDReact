import express from 'express'
import { AppDataSource } from '../database/data-source.js'
import { Like } from 'typeorm'
import generateToken from '../../src/utils/jwt.js'
import * as faceapi from "face-api.js";

import salaEntity from '../entities/sala.js'
import alunoEntity from '../entities/aluno.js'
import usuarioEntity from '../entities/usuario.js'
import funcionarioEntity from '../entities/funcionario.js'
import AnotacoesEntity from '../entities/anotacoes.js'
import entrada_saida from '../entities/entrada_saida.js';

const route = express.Router()
const salaRepository = AppDataSource.getRepository(salaEntity)
const alunoRepository = AppDataSource.getRepository(alunoEntity)
const usuarioRepository = AppDataSource.getRepository(usuarioEntity)
const funcionarioRepository = AppDataSource.getRepository(funcionarioEntity)
const anotacoesRepository = AppDataSource.getRepository(AnotacoesEntity)
const entrada_saidaRepository = AppDataSource.getRepository(entrada_saida)



//GET RETORNA TODOS OS DADOS DE TODOS OS ALUNOS
route.get("/alunos", async (req, res) => {
    const alunos = await usuarioRepository.find({
        relations: ["aluno"]
    })
    res.json(alunos)
})


//GET RETORNA UM ALUNO ESPECIFICO
route.get("/getaluno/:id", async (req, res) => {
    const {id} = req.params

    const aluno = await usuarioRepository.findOne({
        where: {id_usuario: id},
        relations: ["aluno"]
    })
    console.log(aluno)

    res.json(aluno)
})



//ENDPOINT DA SEARCH BAR PARA ALUNOS
route.get("/busca/:query", async (req, res) => {
    const {query} = req.params

    const usuarios = await usuarioRepository.find({
        where:{nome: Like(`${query}%`)},
        relations: ["aluno"]
    })

    return res.json(usuarios)
})


//RETORNA CPF DE 1 ALUNO ESPECIFICO
route.get("/:id/cpf", async (req, res) => {
    const {id} = req.params

    const aluno = await usuarioRepository.findOneBy({id_usuario: id})
    return res.json(aluno.cpf)
})






//ROTAS, ANOTACOES=---------------

//GET EM TODAS AS NOTAS DE CERTO USUARIO
route.get("/getnotas/:id", async (req,res) => {
    const {id} = req.params
    const notas = await anotacoesRepository.find({where: {id_usuario: id}})

    return res.json(notas)
})


//SALVA UMA NOTA NOVA
route.post("/salvarnota", async (req,res) => {
    const {userID, titulo, conteudo, cor} = req.body

    await anotacoesRepository.save({
        id_usuario: userID,
        titulo,
        conteudo,
        cor
    })

    res.send("nota salva")
})

//DELETA UMA NOTA
route.delete("/deletarnota/:notaID", async (req,res) => {
    const {notaID} = req.params

    await anotacoesRepository.delete(notaID)

    res.send(`nota ${notaID} deletada`)
})

//PERGUNTA SE TEM EVENTO EM TAL DIA, SE SIM, RETORNA O EVENTO
route.get("/hasEvent/:dia", async (req,res) => {
    const {dia} = req.params
    const hoje = new Date()
    const mes = hoje.getMonth()

    await anotacoesRepository.find


})



//// ENDPOINTS DE HORARIOS DE PONTO

route.get("/gethorario/:id" , async (req,res) => {
    const {id} = req.params

    const pontos = await entrada_saidaRepository.find({where: {id_usuario: id}})
    if (pontos.length == 0){
        return res.status(500).send("Sem pontos marcados")
    }
    return res.json(pontos)
})




export default route