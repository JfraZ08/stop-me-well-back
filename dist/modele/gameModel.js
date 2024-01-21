"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = void 0;
const sequelize_1 = require("sequelize");
const GameModel = (sequelize) => {
    return sequelize.define('games', {
        joueur1: sequelize_1.DataTypes.STRING,
        joueur2: sequelize_1.DataTypes.STRING,
        winner: sequelize_1.DataTypes.STRING,
        bestTime: sequelize_1.DataTypes.INTEGER,
        objectif: sequelize_1.DataTypes.INTEGER
    }, { timestamps: false });
};
exports.GameModel = GameModel;
