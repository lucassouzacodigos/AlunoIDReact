import express from 'express'
import { AppDataSource } from '../database/data-source.js'
import { Like } from 'typeorm'
import generateToken from '../../src/utils/jwt.js'
import path from 'path'

import salaEntity from '../entities/sala.js'
import alunoEntity from '../entities/aluno.js'
import usuarioEntity from '../entities/usuario.js'
import funcionarioEntity from '../entities/funcionario.js'
import { compararDescritores, gerarDescritor, gerarDescritorBase64 } from '../../src/utils/faceLoader.js';
import { image, math } from '@tensorflow/tfjs'

const route = express.Router()
const salaRepository = AppDataSource.getRepository(salaEntity)
const alunoRepository = AppDataSource.getRepository(alunoEntity)
const usuarioRepository = AppDataSource.getRepository(usuarioEntity)
const funcionarioRepository = AppDataSource.getRepository(funcionarioEntity)


//facial route
//ENDPOINT RECEBE UMA IMAGEM, COMPARA COM IMAGEM REGISTRADA E RETORNA TRUE/FALSE
route.post("/comparar", async (req, res) => {



    const {id, imagemuri} = req.body

    const aluno = await usuarioRepository.findOne({where: {id_usuario: id},relations: ["aluno"]})
    
    
    const imagemSalva = path.resolve(process.cwd(),"..", "public","rostos",aluno.nome,`${aluno.cpf}.png`);
    console.log(aluno.cpf, imagemSalva)
    const descRecebido = await gerarDescritorBase64(imagemuri)
    const descSalvo = await gerarDescritor(imagemSalva)
    const match = compararDescritores(descRecebido, descSalvo)
    res.json({match})
})









export default route