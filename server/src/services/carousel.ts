import BaseService from './base.js'
import Carousel, { CarouselI } from '../models/carousel.js'
import type { IndexesOptions } from 'sequelize'

class CarouselService extends BaseService<Carousel, CarouselI> {
    constructor() {
        super()
        this.model = Carousel
    }

    async findAll(options: IndexesOptions) {
        return await this.model.findAll(options)
    }
}

export default new CarouselService()