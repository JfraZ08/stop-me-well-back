import { Router } from "express";
import { Game, User } from "..";
import { middleware } from "../middlewares/checkToken";


export const gamesRoutes = Router();

gamesRoutes.get("/",middleware,async (req, res) => {
    const game = await Game.findAll();
    const user = await User.findOne({ where: { id: req.userId } });
    if (user) {
        res.status(200).json({
            data:game
        });
    }else {
        res.status(404).json({ error: "Merci de vous connecter" });
    }
});

gamesRoutes.get("/:id",middleware,async (req, res) => {
    const game = await Game.findOne({where: { id: req.params.id }});
    if (game) {
        res.status(200).json({
            game
        });
    }else {
        res.status(404).json({ error: "game not found" });
    }
});

gamesRoutes.post("/",middleware,async (req, res) => {
    const newgame = await Game.create({ joueur1:req.body.joueur1, 
                                        joueur2:req.body.joueur2,
                                        winner:req.body.winner,
                                        bestTime:req.body.bestTime,
                                        objectif:req.body.objectif});
    res.status(200).json({
        newgame
    })
});