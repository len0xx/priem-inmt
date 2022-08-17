import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class ContactInfo extends Model<InferAttributes<ContactInfo>, InferCreationAttributes<ContactInfo>> {
    declare id: number
    declare tel: string
    declare email: string
    declare directorateAddress: string
    declare admissionsAddress: string
    declare vkUrl: string
    declare tgUrl: string
}

export type ContactInfoI = InferAttributes<ContactInfo>

ContactInfo.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        defaultValue: 1
    },
    tel: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Поле "E-mail" не должно быть пустым'
            },
            notEmpty: {
                msg: 'Поле "E-mail" не должно быть пустым'
            },
            isEmail: {
                msg: 'Пожалуйста, введите корректный e-mail'
            }
        }
    },
    directorateAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Поле «Дирекция института» не должно быть пустым'
            },
            notEmpty: {
                msg: 'Поле «Дирекция института» не должно быть пустым'
            }
        }
    },
    admissionsAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Поле «Приемная комиссия» не должно быть пустым'
            },
            notEmpty: {
                msg: 'Поле «Приемная комиссия» не должно быть пустым'
            }
        }
    },
    vkUrl: {
        type: DataTypes.STRING,
    },
    tgUrl: {
        type: DataTypes.STRING,
    }
},
{
    sequelize,
    modelName: 'ContactInfo'
})

// sequelize.sync()

export default ContactInfo