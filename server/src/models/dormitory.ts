import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Dormitory extends Model<InferAttributes<Dormitory>, InferCreationAttributes<Dormitory>> {
    declare img: string
    declare title: string
    declare address: string
}

export type DormitoryI = InferAttributes<Dormitory>

Dormitory.init({
    img: {
        type: DataTypes.STRING,
        allowNull: false,
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