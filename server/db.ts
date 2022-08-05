import { Sequelize } from 'sequelize'

export default new Sequelize(
    'hello',
    'root',
    'Root4343',
    {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            socketPath: '/tmp/mysql.sock'
        }
    }
)
