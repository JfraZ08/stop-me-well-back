import { DataTypes, Sequelize } from "sequelize";


export const UserModel = (sequelize: Sequelize) => {
    return sequelize.define('user', {
        login : DataTypes.STRING,
        password : DataTypes.STRING
    },{ timestamps: false })
}