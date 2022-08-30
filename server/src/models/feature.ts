import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Feature extends Model<InferAttributes<Feature>, InferCreationAttributes<Feature>> {
    declare title: string
    declare description: string
    declare type: string
}

export type FeatureI = InferAttributes<Feature>

Feature.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[ 'bachelor', 'master', 'main', 'specialist', 'instInfo' ]],
                    msg: 'Тип перечисления может принимать одно из пяти значений: bachelor, master, main, specialist или instInfo'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Feature'
    }
)

export default Feature
