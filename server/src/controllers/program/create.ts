import educationalProgramService from '../../services/educationalProgram.js'
import { getErrorDetails, HTTPResponse } from '../../utilities.js'
import type { Request, Response } from 'express'
import { HTTPStatus } from '../../types/enums.js'

interface TeacherI {
    name: string,
    caption: string,
    phone: string,
    email: string
}

export const create = async (req: Request, res: Response) => {
    try {
        const requestData = req.body
        const { title, degree, text } = req.body

        const directions = (req.body.directions).split('\n')

        const educationModes = {
            fullTime: {
                price: requestData.price1,
                duration: requestData.period1,
                languages: requestData.language1,
            },
            partTime: {
                price: requestData.price2,
                duration: requestData.period2,
                languages: requestData.language2,
            },
            partFullTime: {
                price: requestData.price3,
                duration: requestData.period3,
                languages: requestData.language3,
            }
        }

        const vacantSpots = {
            fullTime: {
                budget: requestData.budget1,
                contract: requestData.contract1
            },
            partTime: {
                budget: requestData.budget2,
                count: requestData.contract2
            },
            partFullTime: {
                budget: requestData.budget3,
                count: requestData.contract3
            }
        }

        const teacher: TeacherI = {
            name: requestData.teacher_name,
            caption: requestData.teacher_caption,
            phone: requestData.teacher_phone,
            email: requestData.teacher_email
        }

        const feedbacks = {}

        for (let i = 1; i <= 5; i++) {
            const name = requestData[`feedback_name${i}`]
            const caption = requestData[`feedback_caption${i}`]
            const text = requestData[`feedback_text${i}`]
            if (name !== undefined && caption !== undefined && text !== undefined) {
                feedbacks[i - 1] = {
                    name: name,
                    caption: caption,
                    text: text
                }
            }
        }

        const exams = {}

        for (let i = 1; i <= 2; i++) {
            const exam = requestData[`exam${i}`]
            const result = requestData[`result${i}`]
            if (exam !== undefined && result !== undefined) {
                exams[i - 1] = {
                    exam: exam,
                    result: result,
                }
            }
        }

        await educationalProgramService.create({
            title: title,
            degree: degree,
            educationModes: educationModes,
            vacantSpots: vacantSpots,
            directions: directions,
            teacher: teacher,
            exams: exams,
            text: text,
            feedbacks: feedbacks,
        })
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Образовательная программа успешно создана')
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
