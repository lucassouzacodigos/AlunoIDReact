import { jwtDecode } from 'jwt-decode'


function decodeToken(){
    const token = localStorage.getItem("token")

    var decoded

    if (token != null){
        decoded = jwtDecode(token)
    } 
    else{
        return null
    }

    return {
        "nome": decoded.nome,
        "userID": decoded.userID,
        "tipo_usuario": decoded.tipo_usuario
    }
}

export default decodeToken