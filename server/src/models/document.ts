import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

class Document extends Model<InferAttributes<Document>, InferCreationAttributes<Document>> {
    declare title: string
    declare src: string
    declare type: string
    declare size: number
    declare extension: string
}

export type DocumentI = InferAttributes<Document>

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
                    args: [[ 'media', 'document' ]],
                    msg: 'Тип документа может принимать одно из двух значений: media или document'
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
