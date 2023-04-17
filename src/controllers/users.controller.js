import getConnection from '../database/database';
import {CREATE_USER, GET_USER} from '../database/queries'

const createUser = async (req, res) => {
    const {email, name, lastname, sub} = req.body
    const connection = await getConnection()
    try {
        await connection.query(CREATE_USER, [email,name,lastname, sub])
        res.status(200).json({"CREATED": "El usuario se ha creado correctamente"})
    } catch (error) {
        const user = await connection.query(GET_USER, [sub, email])
        res.status(200).json({"success": user})
    }
}



export default {
    createUser
  };
  