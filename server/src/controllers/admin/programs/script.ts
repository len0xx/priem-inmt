import educationalProgramService from '../../../services/educationalProgram.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import programs from './programs.js'
import type { EducationModesI, TeacherI } from '../../../models/educationalProgram.js'

export const script = async (_: Request, res: Response) => {
    try {
        const uploadProgram = async (program) => {
            const educationModes: EducationModesI = {}
            const teacher: TeacherI = {
                name: program.teacher.name,
                caption: program.teacher.position,
                phone: program.teacher.tel,
                email: program.teacher.email,
                photo: program.teacher.photo
            }

            const fullTime = 'Очно'
            const partFullTime = 'Очно-заочно'
            const partTime = 'Заочно'

            // TODO: Remove dublicate code
            if (program.educationModes.includes(fullTime)) {
                const index = program.educationModes.indexOf(fullTime)
                const vacantSpots = program.vacantSpots[index]
                educationModes['fullTime'] = {
                    price: program.price[index],
                    duration: program.duration[index],
                    languages: program.languages[index],
                    vacantSpots: {
                        budget: +vacantSpots[0],
                        contract: +vacantSpots[1]
                    }
                }
            }

            if (program.educationModes.includes(partFullTime)) {
                const index = program.educationModes.indexOf(partFullTime)
                const vacantSpots = program.vacantSpots[index]
                educationModes['partFullTime'] = {
                    price: program.price[index],
                    duration: program.duration[index],
                    languages: program.languages[index],
                    vacantSpots: {
                        budget: +vacantSpots[0],
                        contract: +vacantSpots[1]
                    }
                }
            }

            if (program.educationModes.includes(partTime)) {
                const index = program.educationModes.indexOf(partTime)
                const vacantSpots = program.vacantSpots[index]
                educationModes['partTime'] = {
                    price: program.price[index],
                    duration: program.duration[index],
                    languages: program.languages[index],
                    vacantSpots: {
                        budget: +vacantSpots[0],
                        contract: +vacantSpots[1]
                    }
                }
            }

            const exams = []

            if (program.exams != undefined) {
                for (let i = 0; i < program.exams.length; i++) {
                    const exam = program.exams[i]
                    const title = exam.title
                    const result = exam.result
                    if (title && result) {
                        exams[i] = {
                            title: title,
                            result: result
                        }
                    }
                }
            }

            const feedbacks = []

            if (program.feedbacks != undefined) {
                for (let i = 0; i < program.feedbacks.length; i++) {
                    const feedback = program.feedbacks[i]
                    const name = feedback.name
                    const caption = feedback.position
                    const text = feedback.text
                    if (name !== undefined && caption !== undefined && text !== undefined) {
                        feedbacks[i] = {
                            name: name,
                            caption: caption,
                            text: text
                        }
                    }
                }
            }

            const correctProgram = {
                title: program.title,
                degree: program.degree,
                educationModes: educationModes,
                directions: program.directions,
                teacher: teacher,
                exams: exams,
                feedbacks: feedbacks,
                text: program.text,
                partners: program.partners,
            }

            await educationalProgramService.create(correctProgram)
        }

        programs.map((program) => uploadProgram(program))

        return new HTTPResponse(res, HTTPStatus.CREATED, 'Образовательные программы успешно переведены в базу данных')
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
