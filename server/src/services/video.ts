import BaseService from './base.js'
import Video, { IVideo } from '../models/Video.js'

class VideoService extends BaseService<Video, IVideo> {
    constructor() {
        super()
        this.model = Video
    }
}

export default new VideoService()
