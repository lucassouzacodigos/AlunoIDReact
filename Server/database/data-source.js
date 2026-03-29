import "reflect-metadata"
import { DataSource } from "typeorm"


import Usuario from "../entities/usuario.js"
import Aluno from '../entities/aluno.js'
import Sala from '../entities/sala.js'
import Funcionario from "../entities/funcionario.js"
import Anotacoes from '../entities/anotacoes.js'
import entrada_saida from "../entities/entrada_saida.js"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    port: 3306,
    password: "",
    database: "ALUNOIDBD",
    entities: [Usuario, Aluno, Sala, Funcionario, Anotacoes, entrada_saida],       
    migrations: ["./Server/database/migrations/*cjs"],
})

export {AppDataSource}