import BaseService from './base.js'
import ContactInfo, { IContactInfo } from '../models/contactInfo.js'

class ContactInfoService extends BaseService<ContactInfo, IContactInfo> {
    constructor() {
        super()
        this.model = ContactInfo
    }

    async getById(id = 1) {
        return await this.model.findByPk(id)
    }
}

export default new ContactInfoService()