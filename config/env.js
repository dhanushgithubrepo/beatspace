import { config } from 'dotenv';
import path from 'path';

// Load .env file from project root
config({ path: path.resolve(process.cwd(), '.env') });

// Destructure environment variables with defaults
export const {
  PORT = 3000,
  NODE_ENV = 'development',
  DB_URI = '',
  JWT_SECRET = '',
  JWT_EXPIRES_IN = '1d'
} = process.env;

// Optional: warn if required variables are missing
if (!DB_URI) {
  console.warn('⚠️  Warning: DB_URI is not set in your environment variables!');
}
if (!JWT_SECRET) {
  console.warn('⚠️  Warning: JWT_SECRET is not set in your environment variables!');
}


