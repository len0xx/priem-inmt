import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'

class Document extends Model<InferAttributes<Document, { omit: 'id' }>, InferCreationAttributes<Document>> {
    declare id: CreationOptional<number>
    declare title: string
    declare src: string
    declare type: string
    declare size: number
    declare extension: string
}

export type DocumentI = InferAttributes<Document, { omit: 'id' }>

Document.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Название документа не может быть пустым'
                },
                notEmpty: {
                    msg: 'Название документа не может быть пустым'
                }
            }
        },
        src: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Ссылка на файл не может быть пустой'
                },
                notEmpty: {
                    msg: 'Ссылка на файл не может быть пустой'
                }
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'document',
            validate: {
                isIn: {
                    args: [[ 'media', 'docAccommodation', 'docBachelor', 'video' ]],
                    msg: 'Тип документа может принимать одно из четырех значений: media, docAccommodation, docBachelor или video'
                }
            }
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isInt: {
                    msg: 'Значение поля size должно быть числом'
                }
            }
        },
        extension: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Расширение файла не может быть пустым'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Document'
    }
)

export default Document
