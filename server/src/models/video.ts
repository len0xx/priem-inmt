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
    sequelize,
    modelName: 'Video'
})

sequelize.sync()

export default Video