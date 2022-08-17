import Feedback, { type FeedbackI } from '../models/feedback.js'
import BaseService from './base.js'

class FeedbackService extends BaseService<Feedback, FeedbackI> {
    constructor() {
        super()
        this.model = Feedback
    }
}

export default new FeedbackService()