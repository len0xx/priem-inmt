import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Graduate extends Model<InferAttributes<Graduate, { omit: 'id' }>, InferCreationAttributes<Graduate>> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: string
    declare photo: string
}

export type GraduateI = InferAttributes<Graduate, { omit: 'id' }>

Graduate.init(
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
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Поле "Фотография" является обязательным'
                },
                notEmpty: {
                    msg: 'Поле "Фотография" является обязательным'
                },
            },
        }
    },
    {
        sequelize,
        modelName: 'Graduate',
    }
)

export default Graduate