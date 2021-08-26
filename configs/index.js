require('dotenv').config();

const { JWT_SECRET, PORT, NODE_ENV } = process.env;

const CURRENT_JWT_SECRET = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'dev-secret';
const CURRENT_PORT = NODE_ENV === 'production' && PORT ? PORT : 3000;

module.exports = {
  CURRENT_JWT_SECRET,
  CURRENT_PORT,
};
