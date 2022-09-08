import educationalProgramService from '../../../services/educationalProgram.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { TeacherI, EducationModesI, EducationalProgramI } from '../../../models/educationalProgram'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const requestData = req.body
    const { title, degree, text, mode1, mode2, mode3, partner } = requestData

    const previuosProgramState = await educationalProgramService.getById(id)
    const directions: string[] = (req.body.directions).split('\n')
    const educationModes: EducationModesI = {}

    if (mode1) {
        educationModes['fullTime'] = {
            price: requestData.price1,
            duration: requestData.period1,
            languages: requestData.language1,
            vacantSpots: {
                budget: +requestData.budget1,
                contract: +requestData.contract1
            }
        }
    }

    if (mode2) {
        educationModes['partFullTime'] = {
            price: requestData.price2,
            duration: requestData.period2,
            languages: requestData.language2,
            vacantSpots: {
                budget: +requestData.budget2,
                contract: +requestData.contract2,
            }
        }
    }

    if (mode3) {
        educationModes['partTime'] = {
            price: requestData.price3,
            duration: requestData.period3,
            languages: requestData.language3,
            vacantSpots: {
                budget: +requestData.budget3,
                contract: +requestData.contract3
            }
        }
    }

    const teacher: TeacherI = {
        name: requestData.teacher_name,
        caption: requestData.teacher_caption,
        phone: requestData.teacher_phone,
        email: requestData.teacher_email
    }
    if (previuosProgramState.teacher.photo && !requestData.teacher_photo) {
        teacher.photo = previuosProgramState.teacher.photo
    }

    const feedbacks = []
    for (let i = 1; i <= 2; i++) {
        let imgURL: string
        const name = requestData[`feedback_name${i}`]
        const caption = requestData[`feedback_caption${i}`]
        const text = requestData[`feedback_text${i}`]
        const img = requestData[`feedback_img${i}`]

        if (+img && !isNaN(+img)) {
            const file = await documentService.getById(+img)
            imgURL = file ? file.src : undefined
        }

        if ((name || text) && name && text) {
            const newFeedback: Record<string, string> = {
                name: name,
                caption: caption,
                text: text
            }
            if (caption) newFeedback.caption = caption
            if (imgURL) {
                newFeedback.img = imgURL
            }

            // Если новое изображение не было выбрано, а раньше оно было, то сохраняем его, чтобы не потерять при обновлении
            const previuosFeedbackState = previuosProgramState.feedbacks[feedbacks.length - 1]
            if (!newFeedback.img && previuosFeedbackState && previuosFeedbackState.img) {
                newFeedback.img = previuosFeedbackState.img
            }
            feedbacks.push(newFeedback)
        }
    }

    const exams = []
    for (let i = 1; i <= 5; i++) {
        const exam = requestData[`exam${i}`]
        const result = requestData[`result${i}`]
        if (exam !== undefined && result !== undefined) {
            exams[i - 1] = {
                title: exam,
                result: result
            }
        }
    }

    const partners = previuosProgramState.partners
    if (+partner && !isNaN(+partner) && partners.length < 20) {
        const partnerLogoFile = await documentService.getById(+partner)
        const partnerLogoUrl = partnerLogoFile?.src
        if (partnerLogoUrl) partners.push(partnerLogoUrl)
    }

    const newProgramState: EducationalProgramI = {
        title, degree,
        educationModes, directions,
        teacher, exams,
        text, feedbacks,
        partners
    }
    await educationalProgramService.updateById(id, newProgramState)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Образовательная программа успешно обновлена')
})
