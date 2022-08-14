import educationalProgramService from '../../services/educationalProgram.js'
import { getErrorDetails, HTTPResponse } from '../../utilities.js'
import { HTTPStatus } from '../../types/enums.js'
import type { Request, Response } from 'express'
import type { EducationModesI, TeacherI } from '../../models/educationalProgram.js'

export const create = async (req: Request, res: Response) => {
    try {
        const requestData = req.body
        const { title, degree, text, mode1, mode2, mode3 } = req.body

        const directions = (req.body.directions).split('\n')
        const educationModes: EducationModesI = {}

        if (mode1) {
            educationModes['fullTime'] = {
                price: requestData.price1,
                duration: requestData.period1,
                languages: requestData.language1,
                vacantSpots: {
                    budget: requestData.budget1,
                    contract: requestData.contract1
                }
            }
        }

        if (mode2) {
            educationModes['partTime'] = {
                price: requestData.price2,
                duration: requestData.period2,
                languages: requestData.language2,
                vacantSpots: {
                    budget: requestData.budget2,
                    contract: requestData.contract2
                }
            }
        }

        if (mode3) {
            educationModes['partFullTime'] = {
                price: requestData.price3,
                duration: requestData.period3,
                languages: requestData.language3,
                vacantSpots: {
                    budget: requestData.budget3,
                    contract: requestData.contract3
                }
            }
        }

        const teacher: TeacherI = {
            name: requestData.teacher_name,
            caption: requestData.teacher_caption,
            phone: requestData.teacher_phone,
            email: requestData.teacher_email
        }

        const feedbacks = []

        for (let i = 1; i <= 2; i++) {
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

        const exams = []

        for (let i = 1; i <= 5; i++) {
            const title = requestData[`exam${i}`]
            const result = requestData[`result${i}`]
            if (title !== undefined && result !== undefined) {
                exams[i - 1] = {
                    title: title,
                    result: result
                }
            }
        }

        await educationalProgramService.create({
            title: title,
            degree: degree,
            educationModes: educationModes,
            directions: directions,
            teacher: teacher,
            exams: exams,
            text: text,
            feedbacks: feedbacks
        })
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Образовательная программа успешно создана')
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
