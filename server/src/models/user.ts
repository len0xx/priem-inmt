import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

enum Role {
    User = 'user',
    Admin = 'admin'
}

class User extends Model<InferAttributes<User, { omit: 'id' }>, InferCreationAttributes<User>> {
    declare id?: number
    declare firstName: string
    declare lastName: string
    declare email: string
    declare password: string
    declare role?: Role
}

export type UserI = InferAttributes<User, { omit: 'id' }>

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Пример валидации
                notNull: {
                    msg: 'Имя является обязательным полем для заполнения'
                }
            }
        },
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Email является обязательным для заполнения'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пароль является обязательным для заполнения'
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: Role.User,
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

export default User

export interface PublicUser {
    firstName: string,
    lastName?: string,
    email: string,
    role: Role
}
