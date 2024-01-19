"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBlackListModel = void 0;
var sequelize_1 = require("sequelize");
var TokenBlackListModel = function (sequelize) {
    return sequelize.define('token-black-list', {
        token: sequelize_1.DataTypes.STRING,
    });
};
exports.TokenBlackListModel = TokenBlackListModel;
