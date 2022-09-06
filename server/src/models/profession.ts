import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Profession extends Model<InferAttributes<Profession, { omit: 'id' }>, InferCreationAttributes<Profession>> {
    declare id: CreationOptional<number>
    declare title: string
    declare description: string
    declare minsalary: number
    declare duties: string[]
}

export type ProfessionI = InferAttributes<Profession, { omit: 'id' }>

Profession.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите название профессии'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите название профессии'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите описание профессии'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите описание профессии'
                }
            }
        },
        minsalary: {
            type: DataTypes.INTEGER
        },
        duties: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, добавьте хотя бы одну функцию специалиста'
                },
                notEmpty: {
                    msg: 'Пожалуйста, добавьте хотя бы одну функцию специалиста'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Profession'
    }
)

export default Profession
