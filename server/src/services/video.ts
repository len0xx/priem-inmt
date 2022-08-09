import Video from '../models/Video.js'

class VideoService {
    model: typeof Video

    constructor() {
        this.model = Video
    }

    async get(id: number) {
        return await this.model.findByPk(id)
    }

    async getAll() {
        return await this.model.findAll()
    }

    async create(video: { src: string }) {
        return await this.model.create(video)
    }
}

export default new VideoService()