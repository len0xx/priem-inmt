import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../db.js'
import { hashPassword } from '../utilities.js'
import { Role } from '../types/enums.js'

class User extends Model<InferAttributes<User, { omit: 'id' }>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare firstName: string
    declare lastName: string | null
    declare email: string
    declare password: string
    declare role?: CreationOptional<Role>
    declare lastLoginIP?: CreationOptional<string>
    declare lastLoginDate?: CreationOptional<Date>
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
                len: {
                    args: [6, 30],
                    msg: 'Пароль должен иметь длину от 6 до 30 символов'
                },
                notNull: {
                    msg: 'Пароль является обязательным для заполнения'
                },
                containsUpper(value: string) {
                    const capitalLetters = [...'QWERTYUIOPASDFGHJKLZXCVBNM']

                    let containsCapital = false
                    capitalLetters.forEach(symbol => {
                        if (value.includes(symbol)) containsCapital = true
                    })

                    if (!containsCapital) throw new Error('Пароль должен содержать заглавные буквы')
                },
                containsLower(value: string) {
                    const lowerLetters = [...'QWERTYUIOPASDFGHJKLZXCVBNM'.toLowerCase()]

                    let containsLower = false
                    lowerLetters.forEach(symbol => {
                        if (value.includes(symbol)) containsLower = true
                    })

                    if (!containsLower) throw new Error('Пароль должен содержать строчные буквы')
                },
                containsNumbers(value: string) {
                    const numbers = [...'0123456789']

                    let containsNumber = false
                    numbers.forEach(symbol => {
                        if (value.includes(symbol)) containsNumber = true
                    })

                    if (!containsNumber) throw new Error('Пароль должен содержать цифры')
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
        },
        lastLoginIP: {
            type: DataTypes.STRING,
            validate: {
                isIP: {
                    msg: 'Введён некорректный IP адрес'
                }
            }
        },
        lastLoginDate: {
            type: DataTypes.DATE
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
        hooks: {
            beforeCreate(instance: User) {
                // Хешируем пароль перед сохранением
                instance.password = hashPassword(instance.password)
            }
        }
    }
)

export default User

export interface PublicUser {
    firstName: string,
    lastName?: string,
    email: string,
    role: Role
}
