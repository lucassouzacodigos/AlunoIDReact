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

const route = express.Router()
const salaRepository = AppDataSource.getRepository(salaEntity)
const alunoRepository = AppDataSource.getRepository(alunoEntity)
const usuarioRepository = AppDataSource.getRepository(usuarioEntity)
const funcionarioRepository = AppDataSource.getRepository(funcionarioEntity)
const anotacoesRepository = AppDataSource.getRepository(AnotacoesEntity)



//GET RETORNA TODOS OS DADOS DE TODOS OS ALUNOS
route.get("/alunos", async (req, res) => {
    const alunos = await usuarioRepository.find({
        relations: ["aluno"]
    })
    res.json(alunos)
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

route.get("/:id/cpf", async (req, res) => {
    const {id} = req.params

    const aluno = await usuarioRepository.findOneBy({id_usuario: id})
    return res.json(aluno.cpf)
})






//ROTAS, ANOTACOES


//GET EM TODAS AS NOTAS DE CERTO USUARIO
route.get("/getnotas/:id", async (req,res) => {
    const {id} = req.params
    const notas = await anotacoesRepository.find({where: {id_usuario: id}})

    return res.json(notas)
})




export default route