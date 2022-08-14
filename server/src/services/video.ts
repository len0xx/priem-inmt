import BaseService from './base.js'
import Video, { VideoI } from '../models/Video.js'

class VideoService extends BaseService<Video, VideoI> {
    constructor() {
        super()
        this.model = Video
    }
}

export default new VideoService()
