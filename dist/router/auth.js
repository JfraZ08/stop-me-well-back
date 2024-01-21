"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const __1 = require("..");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const saltRounds = 10;
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post('/connect', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const log = yield __1.User.findOne({ where: { login: req.body.login } });
    if (log) {
        const match = yield bcrypt_1.default.compare(req.body.password, log.dataValues.password);
        if (match) {
            const dataToSign = { userId: log.dataValues.id };
            const token = jsonwebtoken_1.default.sign(dataToSign, process.env.JWT_SECRET);
            res.json({
                jwtToken: token
            });
        }
        else {
            res.status(400).json({ error: "indentifiants incorrects" });
        }
    }
    else {
        res.status(400).json({ error: "Cet utilisateur n'existe pas" });
    }
}));
exports.authRoutes.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const log = yield __1.User.findOne({ where: { login: req.body.login } });
    if (log) {
        res.status(400).send('utilisateur existant');
    }
    else {
        const hash = yield bcrypt_1.default.hash(req.body.password, saltRounds);
        const newlog = yield __1.User.create({ login: req.body.login, password: hash });
        delete newlog.dataValues.password;
        res.json({
            newlog
        });
    }
}));
