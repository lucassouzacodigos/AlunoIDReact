import express from 'express'
import { AppDataSource } from '../database/data-source.js'
import { Like } from 'typeorm'
import generateToken from '../../src/utils/jwt.js'

import salaEntity from '../entities/sala.js'
import alunoEntity from '../entities/aluno.js'
import usuarioEntity from '../entities/usuario.js'
import funcionarioEntity from '../entities/funcionario.js'

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const route = express.Router()
const salaRepository = AppDataSource.getRepository(salaEntity)
const alunoRepository = AppDataSource.getRepository(alunoEntity)
const usuarioRepository = AppDataSource.getRepository(usuarioEntity)
const funcionarioRepository = AppDataSource.getRepository(funcionarioEntity)


//ROTAS SALAS

route.post("/sala", async (req,res) => {

    const {nome, tipo, andar, capacidade, equip, tem_ar, tem_pc, tem_acess} = req.body

    await salaRepository.save({
        nome: nome,
        tipo: tipo,
        andar: andar,
        capacidade: capacidade,
        equipamentos: equip,
        tem_ar: tem_ar,
        tem_computador: tem_pc,
        tem_acessibilidade: tem_acess
    })

    res.status(200).send("Dados Cadastrados")

})




// ROTAS ALUNOS

route.post("/salvarfoto", async (req,res) => {
    const {cpf, nome, imagem, timestamp } = req.body;

    console.log(cpf, nome, timestamp)

    const base64Data = imagem.replace(/^data:image\/png;base64,/, "");

    const pasta = path.join(__dirname, "..", "..", "public", "rostos", nome)

    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta, { recursive: true });
    }

    const filePath = path.join(pasta, `${cpf}.png`);

    fs.writeFileSync(filePath, base64Data, "base64");
    console.log("Imagem salva em:", filePath);
    res.json({ ok: true})
})





route.patch("/aluno", async (req, res) => {
    const {userID, novaSenha} = req.body

    const result = await usuarioRepository.update({id_usuario: userID}, {senha: novaSenha})
    if (result.affected === 0) {
        return res.json({error: "usuario inexistente"})
    }

    res.json({ message: `Senha atualizada com sucesso para ${novaSenha}` });

})


route.delete("/aluno", async (req,res) => {
    const {userID} = req.body

    const deletedUser = await usuarioRepository.delete(userID)
    res.send("Usuario deletado")

})

route.post("/aluno", async (req,res) => {
    const {
        nome, nasc, cpf, rg, email,
        senha, sexo, cep, rua, numero,
        bairro, cidade, complemento,
        serie, turma, modalidade,
        turno, necessidades,
        necessidades_desc
    } = req.body
    let genero


    if(sexo == "Feminino"){
        genero = "M"
    }else{ genero = "H"}



    const usuario = await usuarioRepository.save({
        tipo_usuario: "Aluno",
        nome,
        data_nasc: nasc,
        cpf,
        rg,
        email,
        senha: "123",
        sexo: genero,
        cep,
        numero_casa: numero,
        complemento,
    })


    await alunoRepository.save({
        id_aluno: usuario.id_usuario,
        serie,
        turma,
        modalidade_ensino: modalidade,
        turno,
        necessidades_especiais: necessidades,
        necessidades_desc,
    })
    console.log("aluno cadastrado")
    res.json({"status":"SUCESSO"})

})



//FUNCIONARO

route.post("/funcionario",async (req,res) => {
        const {
        nome, nasc, cpf, rg, email,
        senha, sexo, cep, rua, numero,
        bairro, cidade, complemento,
        cargo, setor, contrato, registro
        
    } = req.body
    let genero


    if(sexo == "Feminino"){
        genero = "M"
    }else{ genero = "H"}


    const usuario = await usuarioRepository.save({
        tipo_usuario: "Funcionario",
        nome,
        data_nasc: nasc,
        cpf,
        rg,
        email,
        senha : "123",
        genero,
        cep,
        numero_casa: numero,
        complemento,
        
    })

    await funcionarioRepository.save({
        id_funcionario: usuario.id_usuario,
        cargo,
        setor,
        contrato,
        registro
    })
})



export default route