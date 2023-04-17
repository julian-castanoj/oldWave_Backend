import getConnection from "../database/database";
import {
  GET_ALL_BRAND, GET_ALL_CATEGORIES, GET_ALL_STATE, GET_CATEGORY_BY_NAME
} from "../database/queries";

const getAllFilters = async(req, res) => {
    try {
        const connection = await getConnection();
        const categories = await connection.query(GET_ALL_CATEGORIES);
        const brand = await connection.query(GET_ALL_BRAND)
        const state = await connection.query(GET_ALL_STATE)
        res.status(200).json({category: categories, brand, state})
        
    } catch (e) {
        res.status(400).end({error: "Ha ocurrido un error interno"})
    }
}

/* const getProductsByCategory = async (req, res) => {
    try {
        const {category} = req.params
        const connection = await getConnection();
        const categories = await connection.query(GET_CATEGORY_BY_NAME, [category])
        res.status(200).json(categories)

    } catch (e) {
        res.status(400).end({error: "Por favor revise su sintaxis"})
    }
}
 */

export default {
    getAllFilters,
    /* getProductsByCategory */
  };
  