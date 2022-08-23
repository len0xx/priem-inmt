import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Famous extends Model<InferAttributes<Famous, { omit: 'id' }>, InferCreationAttributes<Famous>> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: string
    declare graduateYear?: number
    declare photo?: string
}

export type FamousI = InferAttributes<Famous, { omit: 'id' }>

Famous.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [4, 256],
                    msg: 'Поле "ФИО" должно иметь длину от 4 до 256 символов'
                },
                notEmpty: {
                    msg: 'Поле "ФИО" является обязательным'
                },
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Подпись" является обязательным'
                },
            },
        },
        graduateYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Responsible',
    }
)

export default Famous