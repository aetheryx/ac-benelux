import { config } from 'dotenv';

config();

export default {
  listen: {
    host: String(process.env.HOST),
    port: Number(process.env.PORT),
  },
  publicKey: String(process.env.PUBLIC_KEY),
};
