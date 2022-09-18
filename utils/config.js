const {
  DATABASE = 'mongodb://127.0.0.1:27017/moviesdb',
  PORT = 3001,
  SECRET_DEV_KEY = 'super-strong-secret',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  DATABASE, PORT, SECRET_DEV_KEY, NODE_ENV, JWT_SECRET,
};
