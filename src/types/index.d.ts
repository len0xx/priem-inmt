import type { DegreeLevel } from './enums'

export interface TeacherI {
    name: string
    caption: string
    phone: string
    email: string
}

export interface EducationModeI {
    price: string
    duration: string
    languages: string
    vacantSpots: {
        budget: number
        contract: number
    }
}

export interface EducationModesI {
    partTime?: EducationModeI
    partFullTime?: EducationModeI
    fullTime?: EducationModeI
}

export interface EducationalProgram {
    id: number
    title: string
    degree: DegreeLevel
    educationModes: EducationModesI
    directions: string[]
    teacher: TeacherI
    feedbacks: {
        name: string
        caption: string
        text: string
    }[]
    exams: {
        title: string
        result: string
    }[]
    text: string
}
