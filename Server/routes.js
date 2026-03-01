import express from 'express'
import loginController from './controllers/loginController.js'
import cadastroController from './controllers/cadastroController.js'
import querysController from './controllers/querysController.js'
import facialController from './controllers/facialController.js'


const routes = express.Router()

routes.use("/login", loginController)
routes.use("/cadastro", cadastroController)
routes.use("/controle", querysController)
routes.use("/facial", facialController)

export default routes