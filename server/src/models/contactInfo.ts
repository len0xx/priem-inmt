import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
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
    tel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
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
            notEmpty: {
                msg: 'Поле "Дирекция института" не должно быть пустым'
            }
        }
    },
    admissionsAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Поле "Приемная комиссия" не должно быть пустым'
            }
        }
    },
    vkUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                msg: 'Пожалуйста, введите коректный URL в поле "Ссылка ВКонтакте"'
            }
        }
    },
    tgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                msg: 'Пожалуйста, введите коректный URL в поле "Ссылка Телеграм"'
            }
        }
    }
},
{
    sequelize,
    modelName: 'ContactInfo'
})

// sequelize.sync()

export default ContactInfo