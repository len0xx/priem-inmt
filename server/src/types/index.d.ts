import type { Request } from 'express'
import type User from '../models/user'

export interface HTTPErrorI extends Error {
    code: number
}

export interface CustomRequest extends Request {
    user: User
}

export interface DefaultModel {
    id: number,
    createdAt: Date,
    updatedAt: Date
}
