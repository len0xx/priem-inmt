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
        allowNull: false
    },
    directorateAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admissionsAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vkUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'ContactInfo'
})

export default ContactInfo