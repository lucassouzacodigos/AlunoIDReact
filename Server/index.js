import express from 'express'
import { AppDataSource } from './database/data-source.js'
import routes from './routes.js'
import cors from 'cors'
import fs from 'fs'

const server = express()
const port = 3333


server.use(express.urlencoded({ extended: true }))
server.use(cors())
server.use(express.json({ limit: '500mb' }))
server.use("/", routes)
server.use("/fotos", express.static('../public/rostos'))


AppDataSource.initialize()
    .then(async () => {
        console.log("Banco de dados conectado")
    })

server.listen(port, () => {
    console.log(`Server rodando, Porta: ${port}`)
})