"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (decoded) {
                req.userId = decoded.userId;
                next();
            }
            else {
                res.status(401).json({ error: 'token non valide' });
            }
        }
        catch (e) {
            res.status(401).json({ error: 'token non valide' });
        }
    }
    else {
        res.status(401).json({ error: 'pas de token' });
    }
};
exports.middleware = middleware;
