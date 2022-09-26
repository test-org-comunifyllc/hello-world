import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {BASE_URL,PORT} = process.env;
console.log(process.env.PORT,'port>>>>>>>>>>>>')