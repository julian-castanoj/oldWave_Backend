import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT || '',
  db: {
    host: process.env.HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || '',
  },
};
