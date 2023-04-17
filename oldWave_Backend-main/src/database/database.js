import mysql from 'promise-mysql';
import config from '../config';
//import sequalize from 'sequelize'


const connection = mysql.createPool(config.db);

function getConnection() {
  return connection;
}

export default getConnection;
