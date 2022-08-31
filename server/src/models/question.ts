import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Question extends Model<InferAttributes<Question, { omit: 'id' }>, InferCreationAttributes<Question>> {
    declare id: CreationOptional<number>
    declare text: string
    declare answer: string
    declare page: string
}

export type QuestionI = InferAttributes<Question, { omit: 'id' }>

Question.init(
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Текст вопроса" является обязательным'
                }
            }
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Ответ" является обязательным'
                }
            }
        },
        page: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Страница" является обязательным'
                },
                isIn: {
                    args: [[ 'bachelor', 'master']],
                    msg: 'Страница может принимать одно из двух значений: bachelor или master'
                }
            },
        }
    },
    {
        sequelize,
        modelName: 'Question',
    }
)

export default Question