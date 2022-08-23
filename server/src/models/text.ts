import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Text extends Model<InferAttributes<Text, { omit: 'id' }>, InferCreationAttributes<Text>> {
    declare id: CreationOptional<number>
    declare name: string
    declare content: string
}

export type TextI = InferAttributes<Text, { omit: 'id' }>

Text.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Text'
    }
)

export default Text
