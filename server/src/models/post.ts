import { CreationOptional, Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Post extends Model<InferAttributes<Post, { omit: 'id' }>, InferCreationAttributes<Post>> {
    declare id: CreationOptional<number>
    declare title: string
    declare text: string
    declare links: { text: string, url: string }[]
    declare img?: string
    declare colourfulBackground?: boolean
}

export type PostI = InferAttributes<Post, { omit: 'id' }>

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    links: {
        type: DataTypes.JSON,
        allowNull: false
    },
    img: DataTypes.STRING,
    colourfulBackground: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    sequelize,
    modelName: 'Post'
})

export default Post
