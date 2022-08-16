import { DataTypes, Model, InferAttributes, InferCreationAttributes, STRING } from 'sequelize'
import sequelize from '../../db.js'

class ContactInfo extends Model<InferAttributes<ContactInfo>, InferCreationAttributes<ContactInfo>> {
    declare tel: string
    declare email: string
    declare directorateAddress: string
    declare admissionsAddress: string
    declare vkUrl: string
    declare tgUrl: string
}

export type ContactInfoI = InferAttributes<ContactInfo>

ContactInfo.init({
    tel: STRING,
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
    vkUrl: STRING,
    tgUrl: STRING
},
{
    sequelize,
    modelName: 'ContactInfo'
})

// sequelize.sync()

export default ContactInfo