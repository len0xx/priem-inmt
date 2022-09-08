import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Dormitory extends Model<InferAttributes<Dormitory, { omit: 'id' }>, InferCreationAttributes<Dormitory>> {
    declare id: CreationOptional<number>
    declare img: string
    declare title: string
    declare address: string
}

export type DormitoryI = InferAttributes<Dormitory, { omit: 'id' }>

Dormitory.init({
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
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize,
    modelName: 'Dormitory'
})

export default Dormitory