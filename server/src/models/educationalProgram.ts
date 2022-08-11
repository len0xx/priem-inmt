import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'
import { DegreeLevel } from '../types/enums.js'

class EducationalProgram extends Model<InferAttributes<EducationalProgram>, InferCreationAttributes<EducationalProgram>> {
    declare title: string
    declare degree: string
    declare educationModes: object
    declare directions: object
    declare teacher: object
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
        educationModes: {
            type: DataTypes.JSON,
            allowNull: false
        },
        directions: {
            type: DataTypes.JSON,
            allowNull: false
        },
        teacher: {
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
