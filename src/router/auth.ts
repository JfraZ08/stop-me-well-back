import { Router } from "express";
import { User } from "..";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const saltRounds = 10;

export const authRoutes = Router();

authRoutes.post('/connect'), async (req, res: any) => {
    const log = await User.findOne( { where : { login : req.body.login}})
    if (log) {
        const match = await bcrypt.compare(req.body.password, log.dataValues.password);
        if(match){
            const dataToSign: IJwtInfo = { userId: log.dataValues.id };
            const token = jwt.sign(dataToSign, process.env.JWT_SECRET!);
            res.json({
                jwtToken : token
            });
        }
        else {
            res.status(400).json({ error: "indentifiants incorrects"});
        }
    } else {
        res.status(400).json({ error : "Cet utilisateur n'existe pas"});
    }

});