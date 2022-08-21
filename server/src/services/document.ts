import BaseService from './base.js'
import Document, { DocumentI } from '../models/document.js'

class DocumentService extends BaseService<Document, DocumentI> {
    constructor() {
        super()
        this.model = Document
    }
}

export default new DocumentService()
