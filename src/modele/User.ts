import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "..";

export const UserModel = (sequelize: Sequelize) => {
    return sequelize.define('userModel', {
        login : DataTypes.STRING,
        password : DataTypes.STRING
    })
}