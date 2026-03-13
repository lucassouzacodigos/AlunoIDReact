import "reflect-metadata"
import { DataSource } from "typeorm"


import Usuario from "../entities/usuario.js"
import Aluno from '../entities/aluno.js'
import Sala from '../entities/sala.js'
import Funcionario from "../entities/funcionario.js"
import Anotacoes from '../entities/anotacoes.js'

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    port: 3306,
    password: "etecembu@123",
    database: "ALUNOIDBD",
    entities: [Usuario, Aluno, Sala, Funcionario, Anotacoes],       
    migrations: ["./Server/database/migrations/*cjs"],
})

export {AppDataSource}