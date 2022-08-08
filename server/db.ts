import { Options, Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env
const dev = NODE_ENV == 'development'

interface ConnectionConfig {
    database: string,
    user: string,
    password: string,
    options: Options
}

const CONFIG: ConnectionConfig = {
    database: dev ? 'postgres' : DB_NAME,
    user: dev ? 'postgres' : DB_USER,
    password: dev ? 'postgres' : DB_PASSWORD,
    options: {
        host: dev ? 'localhost' : DB_HOST,
        dialect: 'postgres'
    }
}

export default new Sequelize(
    CONFIG.database,
    CONFIG.user,
    CONFIG.password,
    CONFIG.options
)
