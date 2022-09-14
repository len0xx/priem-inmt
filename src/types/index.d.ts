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

export interface TeacherI {
    name: string
    caption: string
    phone: string
    email: string
    photo?: string
}

export type ContentType = 'multipart/form-data' | 'application/x-www-form-urlencoded' | 'text/plain'

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

export interface ProgramFeedbackI {
    name: string
    caption: string
    text: string
    img: string
}

export interface EducationalProgram {
    id: number
    title: string
    degree: DegreeLevel
    educationModes: EducationModesI
    directions: string[]
    teacher: TeacherI
    feedbacks: ProgramFeedbackI[]
    exams: {
        title: string
        result: string
    }[]
    text: string,
    partners: string[]
}

export interface PostI {
    id?: number
    title: string
    text: string
    links: { text: string, url: string }[]
    img?: string
    colourfulBackground?: boolean
}

export interface ResponsibleI {
    id?: number
    name: string
    label: string
    phone: string
    email: string
    img: string
}

export interface QuestionI {
    id?: number
    text: string
    answer: string
}

export interface ContactInfoI {
    id: number
    tel: string
    email: string
    directorateAddress: string
    admissionsAddress: string
    links: { text: string, url: string }[]
}

export interface FeedbackI {
    id: number
    page: string
    name: string
    description: string
    img?: string
    text: string
    level: string
}

export interface DormitoryI {
    id?: number
    img: string
    title: string
    address: string
}

export interface OpportunityI {
    id: number
    title: string
    description: string
}

export interface ProfessionI {
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

export interface DocumentI {
    id?: number
    title: string
    src: string
    extension: string
}

export interface RentInfoI {
    id: number
    heading: string
    subheading: string
    text: string
    tel1: string
    tel2: string
    linkText: string
    linkURL: string
}

export interface SettlementI {
    id?: number
    name: string
    label: string
    address: string
    auditory: string
    phone: string
    email: string
    photo: string
}

export interface GraduateI {
    id?: number
    name: string
    description: string
    photo: string
}

export interface TextI {
    id: number
    name: string
    content: string
}

export interface PartnerI {
    id: number
    name?: string
    logo: string
}

export interface CarouselI {
    id: number
    img: string
}

export interface FeatureI {
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
