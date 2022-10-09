import dotenv from "dotenv";
const environment = process.env.NODE_ENV === "production" ? process.env.NODE_ENV : "local";
dotenv.config({ path: `.env.${environment}` });
