require('dotenv').config();

const { JWT_SECRET, PORT, NODE_ENV } = process.env;

const CURRENT_JWT_SECRET = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'dev-secret';
const CURRENT_PORT = NODE_ENV === 'production' && PORT ? PORT : 3001;

const { BASE_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const ALLOWED_CORS = [
  'https://home-page-student.nomoredomains.club',
  'http://home-page-student.nomoredomains.club',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = {
  CURRENT_JWT_SECRET,
  CURRENT_PORT,
  BASE_URL,
  ALLOWED_CORS,
};
