import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../../db.js'

type RoleType = 'user' | 'admin'
enum Role { User = 'user', Admin = 'admin' }

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare firstName: string
    declare lastName: string
    declare email: string
    declare password: string
    declare role: RoleType
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
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
            type: DataTypes.ENUM(Role.User, Role.Admin),
            allowNull: false,
            defaultValue: Role.User,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    }
)

sequelize.sync({ alter: true })

export default User

export interface PublicUser {
    firstName: string,
    lastName?: string,
    email: string,
    role: RoleType
}
