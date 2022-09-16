import Text, { type IText } from '../models/Text.js'
import BaseService from './base.js'

class TextService extends BaseService<Text, IText> {
    constructor() {
        super()
        this.model = Text
    }

    async getByName(name: string) {
        return await this.model.findOne({ where: { name }})
    }
}

export default new TextService()