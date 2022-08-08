import { DataTypes, Model } from 'sequelize'
import sequelize from '../../db.js'

export default class User extends Model {}

User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
})

sequelize.sync({ alter: true })
