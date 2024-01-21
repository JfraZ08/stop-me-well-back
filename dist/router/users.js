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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const checkToken_1 = require("../middlewares/checkToken");
const __1 = require("..");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.get("/check-auth", checkToken_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield __1.User.findOne({ where: { id: req.userId } });
    if (user) {
        res.json({
            user
        });
    }
    else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
    }
}));
