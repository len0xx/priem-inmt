import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Partner extends Model<InferAttributes<Partner, { omit: 'id' }>, InferCreationAttributes<Partner>> {
    declare id: CreationOptional<number>
    declare name: string
    declare logo: string
}

export type IPartner = InferAttributes<Partner, { omit: 'id' }>

Partner.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Поле "Логотип" является обязательным'
                },
                notEmpty: {
                    msg: 'Поле "Логотип" является обязательным'
                },
            },
        }
    },
    {
        sequelize,
        modelName: 'Partner',
    }
)

export default Partner