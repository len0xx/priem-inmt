import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'
import { DegreeLevel } from '../types/enums.js'

export interface TeacherI {
    name: string,
    caption: string,
    phone: string,
    email: string
}

export interface EducationModeI {
    price: string,
    duration: string,
    languages: string,
    vacantSpots: {
        budget: number,
        contract: number
    }
}

export interface EducationModesI {
    partTime?: EducationModeI,
    partFullTime?: EducationModeI,
    fullTime?: EducationModeI
}

class EducationalProgram extends Model<InferAttributes<EducationalProgram, { omit: 'id' }>, InferCreationAttributes<EducationalProgram>> {
    declare id: CreationOptional<number>
    declare title: string
    declare degree: DegreeLevel
    declare educationModes: EducationModesI
    declare directions: string[]
    declare teacher: TeacherI
    declare feedbacks: { name: string, caption: string, text: string }[]
    declare exams: { title: string, result: string }[]
    declare text: string
}

export type EducationalProgramI = InferAttributes<EducationalProgram, { omit: 'id' }>

const degrees = [...Object.values(DegreeLevel).filter(k => typeof k === 'string')]

EducationalProgram.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Поле "Название" является обязательным для заполнения'
                },
            },
        },
        degree: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                isIn: {
                    args: [degrees],
                    msg: 'Значение поля Degree может принимать только одно из трёх значений: ' + degrees.join(', ')
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
