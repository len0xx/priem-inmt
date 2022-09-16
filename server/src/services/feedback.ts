import Feedback, { type IFeedback } from '../models/feedback.js'
import BaseService from './base.js'

class FeedbackService extends BaseService<Feedback, IFeedback> {
    constructor() {
        super()
        this.model = Feedback
    }
}

export default new FeedbackService()