import BaseService from './base.js'
import Question, { IQuestion } from '../models/question.js'
import type { IndexesOptions } from 'sequelize'

class QuestionService extends BaseService<Question, IQuestion> {
    constructor() {
        super()
        this.model = Question
    }

    async findAll(options: IndexesOptions) {
        return await this.model.findAll(options)
    }
}

export default new QuestionService()