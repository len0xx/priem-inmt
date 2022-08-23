import Text, { type TextI } from '../models/Text.js'
import BaseService from './base.js'

class TextService extends BaseService<Text, TextI> {
    constructor() {
        super()
        this.model = Text
    }
    async getByName(name: string) {
        return await this.model.findOne({ where: { name }})
    }
}

export default new TextService()