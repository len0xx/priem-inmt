import { Sequelize } from 'sequelize'

export default new Sequelize(
    'postgres',
    'postgres',
    '',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)
