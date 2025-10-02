// Template environment variables
export const {
    PORT = 3000,
    NODE_ENV = 'development',
    DB_URI = '',       // put your MongoDB URI here
    JWT_SECRET = '',   // put your JWT secret here
    JWT_EXPIRES_IN = '1d'
  } = process.env;
  