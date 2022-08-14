import Post, { type PostI } from '../models/post.js'
import BaseService from './base.js'

class PostService extends BaseService<Post, PostI> {
    constructor() {
        super()
        this.model = Post
    }
}

export default new PostService()
