import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Carousel extends Model<InferAttributes<Carousel, { omit: 'id' }>, InferCreationAttributes<Carousel>> {
    declare id: CreationOptional<number>
    declare img: string
}

export type CarouselI = InferAttributes<Carousel, { omit: 'id' }>

Carousel.init(
    {
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Поле "Изображение" является обязательным'
                },
                notEmpty: {
                    msg: 'Поле "Изображение" является обязательным'
                },
            },
        }
    },
    {
        sequelize,
        modelName: 'Carousel',
    }
)

export default Carousel