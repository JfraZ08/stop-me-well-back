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
exports.gamesRoutes = void 0;
const express_1 = require("express");
const __1 = require("..");
const checkToken_1 = require("../middlewares/checkToken");
exports.gamesRoutes = (0, express_1.Router)();
exports.gamesRoutes.get("/", checkToken_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield __1.Game.findAll();
    const user = yield __1.User.findOne({ where: { id: req.userId } });
    if (user) {
        res.status(200).json({
            data: game
        });
    }
    else {
        res.status(404).json({ error: "Merci de vous connecter" });
    }
}));
exports.gamesRoutes.get("/:id", checkToken_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield __1.Game.findOne({ where: { id: req.params.id } });
    if (game) {
        res.status(200).json({
            game
        });
    }
    else {
        res.status(404).json({ error: "game not found" });
    }
}));
exports.gamesRoutes.post("/", checkToken_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newgame = yield __1.Game.create({ joueur1: req.body.joueur1,
        joueur2: req.body.joueur2,
        winner: req.body.winner,
        bestTime: req.body.bestTime,
        objectif: req.body.objectif });
    res.status(200).json({
        newgame
    });
}));
exports.gamesRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield __1.Game.findOne({ where: { id: req.params.id } });
    if (game) {
        const upgame = yield game.update(req.body);
        res.status(200).json({
            upgame
        });
    }
    else {
        res.status(404).json({ error: "game not found" });
    }
}));
exports.gamesRoutes.delete("/:id", checkToken_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield __1.Game.findOne({ where: { id: req.params.id } });
    if (game) {
        const delgame = yield game.destroy();
        res.status(200).json(delgame);
    }
    else {
        res.status(400).json({ error: "game non trouve" });
    }
}));
