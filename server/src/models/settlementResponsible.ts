import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class SettlementResponsible extends Model<InferAttributes<SettlementResponsible, { omit: 'id' }>, InferCreationAttributes<SettlementResponsible>> {
    declare id: CreationOptional<number>
    declare name: string
    declare label: string
    declare address: string
    declare auditory: string
    declare phone: string
    declare email: string
    declare photo?: string
}

export type SettlementResponsibleI = InferAttributes<SettlementResponsible, { omit: 'id' }>

SettlementResponsible.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        auditory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Question',
    }
)

export default SettlementResponsible