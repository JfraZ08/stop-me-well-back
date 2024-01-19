import { Router } from "express";
import { TokenBlackList, User} from "..";


export const authRoutes = Router();

authRoutes.post('http://localhost:3012/auth/connect'), async (req: { body: { login: any; password: any; }; }, res: any) => {
    const { login, password } = req.body;

}