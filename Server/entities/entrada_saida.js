import { EntitySchema } from "typeorm";
import usuario from "./usuario.js";


const entrada_saida = new EntitySchema({
    name: "entrada_saida",
    tableName: "entrada_saida",
    columns:{
        id_registro: {primary:true, type:"int", generated:true},
        id_usuario: {type: "int", nullable:true},
        data_atual: {type: "date", nullable:true},
        hora_ponto: {type: "time", nullable:true},
        action: {type: "enum" , enum: ["Entrada", "Saida"]}
    },
    relations:{
        usuario: {
            type: "many-to-one",
            target: "usuario",
            joinColumn: {name: "id_usuario"},
            inverseSide: "entrada_saida",
        }
    }
})

export default entrada_saida