import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class RentInfo extends Model<InferAttributes<RentInfo, { omit: 'id' }>, InferCreationAttributes<RentInfo>> {
    declare id: CreationOptional<number>
    declare heading: string
    declare subheading: string
    declare text: string
    declare tel1: string
    declare tel2: string
    declare link: { text: string, url: string }
}

export type RentInfoI = InferAttributes<RentInfo, { omit: 'id' }>

RentInfo.init(
    {
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
        link: {
            type: DataTypes.JSON,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'RentInfo'
    }
)

export default RentInfo
