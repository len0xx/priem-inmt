import { DataTypes, Model } from 'sequelize'
import sequelize from '../../db.js'

class Feature extends Model {}

Feature.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Feature'
})

sequelize.sync({ alter: true })

export default Feature