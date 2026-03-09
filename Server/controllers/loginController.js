import express from 'express'
import { AppDataSource } from '../database/data-source.js'
import usuariosEntity from '../entities/usuario.js'
import { Like } from 'typeorm'
import generateToken from '../../src/utils/jwt.js'


const route = express.Router()
const userRepository = AppDataSource.getRepository(usuariosEntity)


route.post("/", async (req, res) => {
    const {user, senha} = req.body

    if (user == null || senha == null){
        res.status(500).send("Os 2 campos precisam ser preenchidos")
        return
    }

    const userInfo = await userRepository.findOneBy({email: user})
    console.log("=========")
    console.log(userInfo.nome + " \n" + userInfo.email + " \n" + "Logado")
    console.log(userInfo.tipo_usuario)
    console.log("=========")


    if(!userInfo){
        res.status(500).send("Usuario ou senha incorretos")
        return
    }

    if(userInfo.senha == senha){
        const token = generateToken({
            "nome": userInfo.nome,
            "userID": userInfo.id_usuario,
            "tipo_usuario": userInfo.tipo_usuario
        })

        res.json({"token": token})
    }
    else{
        res.status(500).json({error:"usuario ou senha incorretos"})
    }







})


export default route