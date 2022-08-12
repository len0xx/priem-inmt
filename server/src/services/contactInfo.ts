import ContactInfo, { ContactInfoI } from '../models/contactInfo.js'

class ContactInfoService {
    model: typeof ContactInfo

    constructor() {
        this.model = ContactInfo
    }

    async get() {
        return await this.model.findByPk(1)
    }

    async create(contactInfo: ContactInfoI) {
        return await this.model.create(contactInfo)
    }

    async update(contactInfo: ContactInfoI) {
        const data = await this.get()
        data.set(contactInfo)
        data.save()
    }
}

export default new ContactInfoService()