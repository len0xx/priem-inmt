import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

enum Role {
    User = 'user',
    Admin = 'admin'
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare firstName: string
    declare lastName: string
    declare email: string
    declare password: string
    declare role: Role
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Пример валидации
                notNull: {
                    msg: 'Введите имя!'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
            validate: {
                // Аналог типа ENUM – допускаем использование только определённых значений
                isIn: {
                    args: [[...Object.values(Role).filter(k => typeof k === 'string')]],
                    msg: 'Role value does not suit the Role type'
                }
            }
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User' // We need to choose the model name
    }
)

sequelize.sync()

export default User

export interface PublicUser {
    firstName: string,
    lastName?: string,
    email: string,
    role: Role
}
