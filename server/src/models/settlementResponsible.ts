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

export interface ISettlementResponsible extends InferAttributes<SettlementResponsible, { omit: 'id' }> { }

SettlementResponsible.init(
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
            }
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Подпись" является обязательным'
                },
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Адрес" является обязательным'
                },
            }
        },
        auditory: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Аудитория" является обязательным'
                },
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Номер телефона" является обязательным'
                },
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Поле "Email" является обязательным'
                },
            }
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
            }
        }
    },
    {
        sequelize,
        modelName: 'SettlementResponsible',
    }
)

export default SettlementResponsible