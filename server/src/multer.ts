import multer from 'multer'
import path from 'path'
import { generateFileName, HTTPError } from './utilities.js'
import dotenv from 'dotenv'
import { HTTPStatus } from './types/enums.js'
import type { Request } from 'express'

dotenv.config()

const { NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const storage = multer.diskStorage({
    destination: dev ? './build-prod/server/static' : './server/static',
    filename: (_req, file, cb) => {
        const mimeParts = file.mimetype.split('/')
        const extension = mimeParts[mimeParts.length - 1]
        cb(null, generateFileName(file, extension))
    }
})

// Set the maximum allowed file size to 4 MB
const MAX_SIZE = 10 * 1024 * 1024

const createFileFilter = (extensions: string[]): ((req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => void) => {
    return (_, file, cb) => {
        const filetypes = new RegExp(`${ extensions.map(item => item.toLowerCase()).join('|') }`)
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        if (mimetype && extname) {
            return cb(null, true)
        }

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
    limits: { fileSize: MAX_SIZE },
    fileFilter: createFileFilter(['JPEG', 'JPG', 'PNG'])
})
