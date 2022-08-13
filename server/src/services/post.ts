import Post, { PostI } from '../models/post.js'

class PostService {
    model: typeof Post

    constructor() {
        this.model = Post
    }

    async get(id: number) {
        return await this.model.findByPk(id)
    }

    async create(post: PostI) {
        return await this.model.create(post)
    }

    async update(id: number, post: PostI) {
        await this.model.update(post, { where: { id } })
    }
}

export default new PostService()