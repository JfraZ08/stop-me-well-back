import { Router } from "express";
import { TokenBlackList, User} from "..";


export const authRoutes = Router();

authRoutes.post('/connect'), async (req: { body: { login: any; password: any; }; }, res: any) => {
    const { login, password } = req.body;
    const userWithPassword = 

}