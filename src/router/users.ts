import { Router } from "express";
import jwt from 'jsonwebtoken'
import { IJwtInfo } from "./auth";
import { middleware } from "../middlewares/checkToken";
import { User } from "..";

export const userRoutes = Router();

export interface IUser{
    id:string,
    time:number
}

userRoutes.get("/check-auth", middleware,async (req, res) => {
    const user = await User.findOne({ where: { id: req.userId } });
    if (user) {
        res.json({
            user
        });
    } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
    }
});