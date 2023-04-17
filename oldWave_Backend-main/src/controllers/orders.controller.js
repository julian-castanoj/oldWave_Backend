import getConnection from "../database/database";
import {
  GET_ORDER_BY_ID,
  GET_STOCK_PRODUCT,
  UPDATE_STOCK_PRODUCT,
  CREATE_ORDER,
  GET_PRODUCT,
  GET_USER_BY_ID
} from "../database/queries";
import { sendEmail } from "../utils/sendEmail";

const createOrder = async (req, res) => {
  const { idUser, idProduct, quantity } = req.body;

  try {
    if (
      !Array.isArray(idProduct) ||
      !Array.isArray(quantity) ||
      idProduct.length !== quantity.length
    ) {
      res.status(400).end({ error: "Por favor revisa la peticion enviada" });
    }
    let allStock = [];
    let allProduct = [];
    let dataToSendEmail = [];
    const connection = await getConnection();
    
    
    idProduct.forEach(async (product, index) => {
      let newStock = 0;
      const productData = await connection.query(GET_PRODUCT, [idProduct[index]]);
      const stock = await connection.query(GET_STOCK_PRODUCT, [
        idProduct[index],
      ]);

      dataToSendEmail.push({name: productData[0].name, price: productData[0].price, quantity: quantity[index]})

      if (stock[0].stock > quantity[index]) {
        newStock = stock[0].stock - quantity[index];
        await connection.query(CREATE_ORDER, [
          idUser,
          idProduct[index],
          quantity[index],
          new Date().toISOString().slice(0, 19).replace("T", " "),
        ]);
        await connection.query(UPDATE_STOCK_PRODUCT, [
          newStock,
          idProduct[index],
        ]);

        if (index === idProduct.length - 1) {
          const userSendMail = await connection.query(GET_USER_BY_ID, [idUser])
          
          await sendEmail(dataToSendEmail, userSendMail[0].email)
          res.status(201).json({ Succes: "Su orden ha sido creada" });
        }
      } else {
        allStock.push(stock[0].stock);
        allProduct.push(idProduct[index]);
        if (index === idProduct.length - 1) {
          res.status(400).json({
            Error: `Los siguientes productos superaron el stock disponible`,
            stockActual: {
              stockIndividual: allStock,
              idProduct: allProduct,
            },
          });
        }
      }
    });
  } catch (e) {
    res.status(400).json({ Error: "Ha ocurrido un error inesperado" });
  }
};

const getOrderById = async (req, res) => {
  const { idUser } = req.params;
  const connection = await getConnection();
  const order = await connection.query(GET_ORDER_BY_ID, [idUser]);
  if (order.length > 0) {
    res.status(200).json({ success: order });
  } else {
    res
      .status(404)
      .json({
        notFound: "No se ha encontrado informacion con el id ingresado",
      });
  }
};

export default {
  createOrder,
  getOrderById,
  sendEmail
};
