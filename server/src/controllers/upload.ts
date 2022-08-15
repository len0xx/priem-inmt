import { HTTPResponse } from '../utilities.js'
import { HTTPStatus } from '../types/enums.js'
import { catchHTTPErrors } from '../utilities.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => new HTTPResponse(res, HTTPStatus.CREATED, req.file.filename))
