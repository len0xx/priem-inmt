import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Responsible extends Model<InferAttributes<Responsible, { omit: 'id' }>, InferCreationAttributes<Responsible>> {
    declare id: CreationOptional<number>
    declare name: string
    declare label: string
    declare phone: string
    declare email: string
    declare img: string
}

export type ResponsibleI = InferAttributes<Responsible, { omit: 'id' }>

Responsible.init(
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
        label: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Подпись" является обязательным'
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Номер телефона" является обязательным'
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Адрес электронной почты" является обязательным'
                },
            },
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Поле "Изображение" является обязательным'
                },
                notEmpty: {
                    msg: 'Поле "Изображение" является обязательным'
                },
            },
        }
    },
    {
        sequelize,
        modelName: 'Responsible',
    }
)

export default Responsible