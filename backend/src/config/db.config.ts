import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Dialect } from "sequelize";

const dbConfig = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    models: [],
}

export default dbConfig;