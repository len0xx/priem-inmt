import Post, { type IPost } from '../models/post.js'
import BaseService from './base.js'

class PostService extends BaseService<Post, IPost> {
    constructor() {
        super()
        this.model = Post
    }
}

export default new PostService()
