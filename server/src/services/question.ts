import BaseService from './base.js'
import Question, { QuestionI } from '../models/question.js'

class QuestionService extends BaseService<Question, QuestionI> {
    constructor() {
        super()
        this.model = Question
    }
}

export default new QuestionService()