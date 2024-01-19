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
