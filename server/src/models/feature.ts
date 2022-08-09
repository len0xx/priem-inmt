import {DataTypes, Model, InferAttributes, InferCreationAttributes} from 'sequelize'
import sequelize from '../../db.js'

class Feature extends Model<InferAttributes<Feature>, InferCreationAttributes<Feature>> {
    declare title: string
    declare description: string
}

Feature.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Feature',
    }
)

sequelize.sync({alter: true})

export default Feature
