import express from 'express'
import { AppDataSource } from '../database/data-source.js'
import { Like } from 'typeorm'
import generateToken from '../../src/utils/jwt.js'
import path from 'path'

import salaEntity from '../entities/sala.js'
import alunoEntity from '../entities/aluno.js'
import usuarioEntity from '../entities/usuario.js'
import funcionarioEntity from '../entities/funcionario.js'
import entrada_saidaEntity from '../entities/entrada_saida.js'
import { compararDescritores, gerarDescritor, gerarDescritorBase64 } from '../../src/utils/faceLoader.js';
import { image, math } from '@tensorflow/tfjs'

const route = express.Router()
const salaRepository = AppDataSource.getRepository(salaEntity)
const alunoRepository = AppDataSource.getRepository(alunoEntity)
const usuarioRepository = AppDataSource.getRepository(usuarioEntity)
const funcionarioRepository = AppDataSource.getRepository(funcionarioEntity)
const entrada_saidaRepository = AppDataSource.getRepository(entrada_saidaEntity)


//facial route
//ENDPOINT RECEBE UMA IMAGEM, COMPARA COM IMAGEM REGISTRADA E RETORNA TRUE/FALSE
route.post("/comparar", async (req, res) => {



    const {id, imagemuri} = req.body

    const aluno = await usuarioRepository.findOne({where: {id_usuario: id},relations: ["aluno"]})
    console.log(aluno)
    
    const imagemSalva = path.resolve(process.cwd(),"..", "public","rostos",aluno.nome,`${aluno.cpf}.png`);
    console.log(aluno.cpf, imagemSalva)
    const descRecebido = await gerarDescritorBase64(imagemuri)
    const descSalvo = await gerarDescritor(imagemSalva)
    const match = compararDescritores(descRecebido, descSalvo)

    //caso a comparação nao de certo, entra nesse IF
    if (!match) {
        res.json({match: false, message: "Rosto não reconhecido"})
    }

    //Cria um registro de ponto caso ele esteja saindo da escola
    if (aluno.dentro_da_escola == true) {
        await entrada_saidaRepository.save({
            id_usuario: aluno.id_usuario,
            data_atual: new Date().toISOString().split("T")[0], // dia mes e ano
            hora_ponto: new Date().toTimeString().split(" ")[0], // hora exata do ponto
            action: "Saida"
        })
    }
    //Cria um registro de ponto caso ele esteja Entrando da escola
    if (aluno.dentro_da_escola == false) {
        await entrada_saidaRepository.save({
            id_usuario: aluno.id_usuario,
            data_atual: new Date().toISOString().split("T")[0], // dia mes e ano
            hora_ponto: new Date().toTimeString().split(" ")[0], // hora exata do ponto
            action: "Entrada"
        })
    }





    //caso de certo, Atualiza o stauts de "dentro da escola" do usuario para true
    aluno.dentro_da_escola = !aluno.dentro_da_escola
    await usuarioRepository.save(aluno)
    res.json({match: true})


    
})









export default route