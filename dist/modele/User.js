"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const UserModel = (sequelize) => {
    return sequelize.define('user', {
        login: sequelize_1.DataTypes.STRING,
        password: sequelize_1.DataTypes.STRING
    }, { timestamps: false });
};
exports.UserModel = UserModel;
