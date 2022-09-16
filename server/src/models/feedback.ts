import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Feedback extends Model<InferAttributes<Feedback, { omit: 'id' }>, InferCreationAttributes<Feedback>> {
    declare id: CreationOptional<number>
    declare page: 'bachelor' | 'master'
    declare name: string
    declare description: string
    declare img: string
    declare text: string
}

export type IFeedback = InferAttributes<Feedback, { omit: 'id' }>

Feedback.init(
    {
        page: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Страница" является обязательным'
                },
                isIn: {
                    args: [[ 'bachelor', 'master' ]],
                    msg: 'Страница может принимать одно из двух значений: bachelor или master'
                }
            },
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
        description: DataTypes.STRING,
        img: DataTypes.STRING,
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
