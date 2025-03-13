import { config } from 'dotenv';
config({ path: `.env` });
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DATABASE_URL } = process.env;
console.log({ CREDENTIALS, NODE_ENV, PORT, SECRET_KEY, LOG_DIR, LOG_FORMAT, ORIGIN, DATABASE_URL });
