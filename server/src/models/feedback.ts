import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'
import type { DegreeLevel } from '../types/enums.js'

class Feedback extends Model<InferAttributes<Feedback, { omit: 'id' }>, InferCreationAttributes<Feedback>> {
    declare id: CreationOptional<number>
    declare level: DegreeLevel
    declare name: string
    declare description: string
    declare img: string
    declare text: string
}

export type FeedbackI = InferAttributes<Feedback, { omit: 'id' }>

Feedback.init(
    {
        level: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите имя автора отзыва'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите имя автора отзыва'
                }
            }
        },
        description: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Поле «Текст отзыва» не может быть пустым'
                },
                notEmpty: {
                    msg: 'Поле «Текст отзыва» не может быть пустым'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Feedback'
    }
)

export default Feedback
