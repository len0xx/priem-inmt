import BaseService from './base.js'
import Document, { IDocument } from '../models/document.js'

class DocumentService extends BaseService<Document, IDocument> {
    constructor() {
        super()
        this.model = Document
    }
}

export default new DocumentService()
