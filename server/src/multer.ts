import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv'
import { generateFileName, HTTPError } from './utilities.js'
import { HTTPStatus } from './types/enums.js'
import type { Request } from 'express'

dotenv.config()

const { NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const storage = multer.diskStorage({
    destination: dev ? './build-prod/server/static' : './server/static',
    filename: (_req: Request, file: Express.Multer.File & { extension: string }, cb) => {
        const mimeParts = file.mimetype.split('/')
        const mimeExtension = mimeParts[mimeParts.length - 1]
        const nameExtension = path.extname(file.originalname).toLowerCase()
        const extension = (nameExtension || mimeExtension || '').replace('.', '')

        file.extension = extension
        cb(null, generateFileName(file, extension))
    }
})

// Функция для генерации размера файла в мегабайтах
const fileSizeMB = (megabytes: number) => megabytes * 1024 * 1024

const createFileFilter = (extensions: string[]): ((req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => void) => {
    return (_req, file, cb) => {
        const filetypes = new RegExp(`${ extensions.map(item => item.toLowerCase()).join('|') }`)
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        if (mimetype && extname)
            return cb(null, true)

        cb(
            new HTTPError(
                HTTPStatus.BAD_REQUEST,
                'Загружаемый файл не соответствует разрешённому списку расширений: ' + extensions.join(', ')
            )
        )
    }
}

export const uploadImage = multer({
    storage: storage,
    limits: { fileSize: fileSizeMB(10) },
    fileFilter: createFileFilter(['JPEG', 'JPG', 'PNG', 'SVG'])
})

export const uploadVideo = multer({
    storage: storage,
    limits: { fileSize: fileSizeMB(800) },
    fileFilter: createFileFilter(['MP4', 'WEBM', 'OGG'])
})

export const uploadDocument = multer({
    storage: storage,
    limits: { fileSize: fileSizeMB(4) },
    fileFilter: createFileFilter(['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'JPG', 'JPEG', 'PNG', 'SVG'])
})
