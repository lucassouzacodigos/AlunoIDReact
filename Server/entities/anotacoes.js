import { EntitySchema } from "typeorm";
import usuario from "./usuario.js";

const anotacoes = new EntitySchema({
    name: "anotacoes",
    tableName: 'anotacoes',
    columns: {
        anotacao_id: {type:"int", primary: true, generated: true},
        id_usuario: {type: "int", nullable: true},
        titulo: {type:"varchar", length: 255, default: "Nota Sem Título"},
        conteudo: {type:"text"},
        cor: {type:"char", length: 7, nullable:true, default: "#808080"} 
    },
        relations:{
        usuario: {
            type: "many-to-one",
            target: "usuario",
            joinColumn: {name: "id_usuario"},
            inverseSide: "anotacoes"
        }
    }
})

export default anotacoes