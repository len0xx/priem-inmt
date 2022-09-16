import BaseService from './base.js'
import Carousel, { ICarousel } from '../models/carousel.js'

class CarouselService extends BaseService<Carousel, ICarousel> {
    constructor() {
        super()
        this.model = Carousel
    }
}

export default new CarouselService()