import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class RentInfo extends Model<InferAttributes<RentInfo>, InferCreationAttributes<RentInfo>> {
    declare id: number
    declare heading: string
    declare subheading: string
    declare text: string
    declare tel1: string
    declare tel2: string
    declare linkText: string
    declare linkURL: string
}

export type RentInfoI = InferAttributes<RentInfo>

RentInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            defaultValue: 1
        },
        heading: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите заголовок'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите заголовок'
                }
            }
        },
        subheading: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите подзаголовок'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите подзаголовок'
                }
            }
        },
        text: {
            type: DataTypes.TEXT
        },
        tel1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите хотя бы один номер телефона'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите хотя бы один номер телефона'
                }
            }
        },
        tel2: {
            type: DataTypes.STRING
        },
        linkText: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите текст ссылки'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите текст ссылки'
                }
            }
        },
        linkURL: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пожалуйста, введите адрес ссылки'
                },
                notEmpty: {
                    msg: 'Пожалуйста, введите адрес ссылки'
                },
                isUrl: {
                    msg: 'Пожалуйста, введите корректный адрес ссылки'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'RentInfo'
    }
)

export default RentInfo
