import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Text extends Model<InferAttributes<Text, { omit: 'id' }>, InferCreationAttributes<Text>> {
    declare id: CreationOptional<number>
    declare name: string
    declare content: string
    declare page?: string
}

export interface IText extends InferAttributes<Text, { omit: 'id' }> { }

Text.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Название поля не может быть пустым'
                },
                notEmpty: {
                    msg: 'Название поля не может быть пустым'
                }
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Текстовое значение поля не может быть пустым'
                },
                notEmpty: {
                    msg: 'Текстовое значение поля не может быть пустым'
                }
            }
        },
        page: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: 'Текстовое значение поля не может быть пустым'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Text'
    }
)

export default Text
