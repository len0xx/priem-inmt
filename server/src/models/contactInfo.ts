import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class ContactInfo extends Model<InferAttributes<ContactInfo, { omit: 'id' }>, InferCreationAttributes<ContactInfo>> {
    declare id: CreationOptional<number>
    declare tel: string
    declare email: string
    declare directorateAddress: string
    declare admissionsAddress: string
    declare links: { text: string, url: string }[]
}

export type IContactInfo = InferAttributes<ContactInfo, { omit: 'id' }>

ContactInfo.init({
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
    links: {
        type: DataTypes.JSON,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'ContactInfo'
})

// sequelize.sync()

export default ContactInfo