import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Opportunity extends Model<InferAttributes<Opportunity, { omit: 'id' }>, InferCreationAttributes<Opportunity>> {
    declare id: CreationOptional<number>
    declare title: string
    declare description: string
}

export type IOpportunity = InferAttributes<Opportunity, { omit: 'id' }>

Opportunity.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите название'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите название'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите описание возможности'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите описание возможности'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Opportunity'
    }
)

export default Opportunity
