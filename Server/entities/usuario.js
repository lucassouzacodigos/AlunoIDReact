import { EntitySchema } from "typeorm";

const usuario = new EntitySchema({
    name: "usuario",
    tableName: 'usuario',
    columns: {
        id_usuario: {type: "int", primary:true, generated:true},
        tipo_usuario: {
            type: "enum",
            enum: ["Admin", "Aluno", "Responsavel Legal", "Funcionario"],
            default: "Aluno",
        },
        dentro_da_escola: {type: "boolean", default: false},
        nome: {type: "varchar", length: 255},
        data_nasc: {type: "date"},
        cpf: {type: "varchar", length: 11,},
        rg: {type: "varchar", length: 255},
        email: {type: "varchar", length: 255},
        senha: {type:"varchar", length: 255},
        sexo: {
            type:"enum",
            enum: ["H", "M"]
        },
        cep: {type: "varchar", length:15},
        numero_casa: {type: "varchar", length:10},
        complemento: {type: "varchar", length:255},
    },
    relations:{
        aluno:{
            type: "one-to-one",
            target: "aluno",
            inverseSide: "usuario"
        },
        anotacoes: {
            type: "one-to-many",
            target: "anotacoes",
            inverseSide: "usuario"
        },
        funcionario: {
            type: "one-to-one",
            target: "funcionario",
            inverseSide: "usuario"
        }
    },
})

export default usuario