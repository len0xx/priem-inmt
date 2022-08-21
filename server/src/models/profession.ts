import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Profession extends Model<InferAttributes<Profession, { omit: 'id' }>, InferCreationAttributes<Profession>> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: string
    declare minsalary: number
    declare functions: string[]
}

export type ProfessionI = InferAttributes<Profession, { omit: 'id' }>

Profession.init(
    {
        name: {
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
            type: DataTypes.STRING,
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
        functions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, добавьте хотя бы одну функцию'
                },
                notEmpty: {
                    msg: 'Пожалуйста, добавьте хотя бы одну функцию'
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
