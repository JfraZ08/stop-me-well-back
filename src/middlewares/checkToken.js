"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var middleware = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (token) {
        try {
            var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
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
