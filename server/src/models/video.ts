import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Video extends Model<InferAttributes<Video, { omit: 'id' }>, InferCreationAttributes<Video>> {
    declare id: CreationOptional<number>
    declare src: string
}

export type VideoI = InferAttributes<Video, { omit: 'id' }>

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

export default Video