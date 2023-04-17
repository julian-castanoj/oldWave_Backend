import getConnection from '../database/database';
import {
  GET_PRODUCT, GET_PRODUCTS, GET_PRODUCT_IMGS, GET_PRODUCT_MATCHES, GET_RANDOM_PRODUCT
} from '../database/queries';

const getProducts = async (req, res) => {
  const connection = await getConnection();
  const products = await connection.query(GET_PRODUCTS);
  res.json(products);
};

const getRecentProducts = async (req, res) => {
  const connection = await getConnection();
  const products = await connection.query(GET_RANDOM_PRODUCT)
  res.status(200).json(products)
}

const getProduct = async (req, res) => {
  const { id } = req.params;
  const connection = await getConnection();
  const product = await connection.query(GET_PRODUCT, [id]);

  if (product.length === 0) {
    res.status(404).json({
      error: 'Product not found',
    });
    return;
  }

  const imgs = await connection.query(GET_PRODUCT_IMGS, [id]);

  product[0].imgs = imgs;

  res.json(product);
};

const matchProduct = async (req, res) => {
  const { query } = req.query;
  const regex = `%${query}%`;
  const connection = await getConnection();
  const products = await connection.query(GET_PRODUCT_MATCHES, [regex, regex, regex, regex, regex]);
  res.json(products);
};

export default {
  getProducts,
  getProduct,
  matchProduct,
  getRecentProducts
};
