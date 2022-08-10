import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'
import { DegreeLevel } from '../types/enums.js'

class EducationalProgram extends Model<InferAttributes<EducationalProgram>, InferCreationAttributes<EducationalProgram>> {
    declare title: string
    declare degree: string
    declare price: string
    declare duration: string
    declare languages: string
    declare directions: string
    declare educationModes: string
    declare teacher: object
    declare vacantSpots: object
    declare feedbacks: object
    declare exams: object
    declare text: string
}

export type EducationalProgramI = InferAttributes<EducationalProgram>

EducationalProgram.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[...Object.values(DegreeLevel).filter(k => typeof k === 'string')]],
                    msg: 'Degree value does not suit the DegreeLevel type'
                }
            },
            defaultValue: DegreeLevel.BACHELOR
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        languages: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        educationModes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teacher: {
            type: DataTypes.JSON,
            allowNull: false
        },
        vacantSpots: {
            type: DataTypes.JSON,
            allowNull: false
        },
        feedbacks: {
            type: DataTypes.JSON,
            allowNull: false
        },
        exams: {
            type: DataTypes.JSON,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'EducationalProgram',
    }
)

export default EducationalProgram
