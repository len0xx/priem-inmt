import type { DegreeLevel } from './enums'

declare global {
    interface ImportMetaEnv {
        NODE_ENV: 'development' | 'production'
    }
}

export interface ModalComponent {
    open: () => void,
    close: () => void,
    toggle: () => void
}

export interface Teacher {
    name: string
    caption: string
    phone: string
    email: string
    photo?: string
}

export type ContentType = 'multipart/form-data' | 'application/x-www-form-urlencoded' | 'text/plain'

export interface EducationMode {
    price: string
    duration: string
    languages: string
    vacantSpots: {
        budget: number
        contract: number
    }
}

export interface EducationModes {
    partTime?: EducationMode
    partFullTime?: EducationMode
    fullTime?: EducationMode
}

export interface ProgramFeedback {
    name: string
    caption: string
    text: string
    img: string
}

export interface EducationalProgram {
    id: number
    title: string
    degree: DegreeLevel
    educationModes: EducationModes
    directions: string[]
    teacher: Teacher
    feedbacks: ProgramFeedback[]
    exams: {
        title: string
        result: string
    }[]
    text: string,
    partners: string[]
}

export interface IPost {
    id?: number
    title: string
    text: string
    links: { text: string, url: string }[]
    img?: string
    colourfulBackground?: boolean
}

export interface IResponsible {
    id?: number
    name: string
    label: string
    phone: string
    email: string
    img: string
}

export interface IQuestion {
    id?: number
    text: string
    answer: string
}

export interface IContactInfo {
    id: number
    tel: string
    email: string
    directorateAddress: string
    admissionsAddress: string
    links: { text: string, url: string }[]
}

export interface IFeedback {
    id: number
    page: string
    name: string
    description: string
    img?: string
    text: string
    level: string
}

export interface IDormitory {
    id?: number
    img: string
    title: string
    address: string
}

export interface IOpportunity {
    id: number
    title: string
    description: string
}

export interface IProfession {
    id: number
    title: string
    description: string
    minsalary: number
    duties: string[]
}

export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'

export interface DefaultAJAXResponse {
    ok: boolean,
    response?: Record<string, unknown>,
    message: string,
    error?: string
}

export interface IDocument {
    id?: number
    title: string
    src: string
    extension: string
}

export interface IRentInfo {
    id: number
    heading: string
    subheading: string
    text: string
    tel1: string
    tel2: string
    linkText: string
    linkURL: string
}

export interface ISettlement {
    id?: number
    name: string
    label: string
    address: string
    auditory: string
    phone: string
    email: string
    photo: string
}

export interface IGraduate {
    id?: number
    name: string
    description: string
    photo: string
}

export interface IText {
    id: number
    name: string
    content: string
}

export interface IPartner {
    id: number
    name?: string
    logo: string
}

export interface ICarousel {
    id: number
    img: string
}

export interface IFeature {
    id: number
    title: string
    description: string
}

export interface Padding {
    x?: PaddingValue,
    y?: PaddingValue,
    top?: PaddingValue,
    bottom?: PaddingValue,
    left?: PaddingValue,
    right?: PaddingValue
}


export type PaddingValue = string | number
