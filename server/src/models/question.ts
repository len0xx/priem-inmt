import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Question extends Model<InferAttributes<Question, { omit: 'id' }>, InferCreationAttributes<Question>> {
    declare id: CreationOptional<number>
    declare text: string
    declare answer: string
}

export type QuestionI = InferAttributes<Question, { omit: 'id' }>

Question.init(
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Question',
    }
)

export default Question