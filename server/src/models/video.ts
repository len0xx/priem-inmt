import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Video extends Model<InferAttributes<Video>, InferCreationAttributes<Video>> {
    declare src: string
}

Video.init({
    src: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Video' // We need to choose the model name
})

sequelize.sync({ alter: true })

export default Video