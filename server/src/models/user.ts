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
    declare role?: Role
}

export interface UserI extends InferAttributes<User> { }

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
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
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
                    msg: 'Пароль должен быть длиной от 6 до 30 символов!'
                },
                notNull: {
                    msg: 'Пароль является обязательным для заполнения'
                },
                containsLowerAndUpperCase(value: string) {
                    const letters = 'qwertyuiopasdfghjklzxcvbnm'
                    const lowerLetters = [...letters]
                    const upperLetters = [...(letters.toUpperCase())]

                    let containsLower = false
                    let containsUpper = false
                    lowerLetters.forEach(letter => value.includes(letter) ? containsLower = true : null)
                    upperLetters.forEach(letter => value.includes(letter) ? containsUpper = true : null)

                    if (!(containsLower && containsUpper))
                        throw new Error('Пароль должен содержать заглавные и строчные буквы')
                },
                containsNumbers(value: string) {
                    const numbers = [...'0123456789']

                    let containsNumbers = false
                    numbers.forEach(letter => value.includes(letter) ? containsNumbers = true : null)

                    if (!containsNumbers)
                        throw new Error('Пароль должен содержать хотя бы одну цифру')
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
