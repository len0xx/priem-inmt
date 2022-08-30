import BaseService from './base.js'
import Carousel, { CarouselI } from '../models/carousel.js'

class CarouselService extends BaseService<Carousel, CarouselI> {
    constructor() {
        super()
        this.model = Carousel
    }
}

export default new CarouselService()