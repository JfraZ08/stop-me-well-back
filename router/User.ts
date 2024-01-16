import { Router } from 'express';
import { User } from '..';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const UserRouter = Router();

UserRouter.post('http://localhost:3012/auth/connect', async (req, res) => {
    const findUser = await User.findOne( { where : { email : req.body.login }})
    if(!findUser){
        res.status(400).json({ error : "reponse"})
    }
    else {
        const isSamePassword = await compare(req.body.password, findUser.dataValues.password)
        if(isSamePassword){
            const token = jwt.sign({userId: findUser.dataValues.id}, 'exact')
            res.json({
                findUser,
                token
            });
        }else {
           res.status(400).json({error : "le mot de passe n'est pas le bon "})
        }
    }
})

UserRouter.post('http://localhost:3012/auth/add', async (req, res) => {
    console.log('res', req.body)
    const findUser = await User.findOne( { where : { email : req.body.identifier }})
    if(findUser){
        res.status(400).json('utilisateur existe déjà')
    }else{

        const newUser = await User.create({
            email : req.body.identifier,
            password : req.body.password
        })
        res.json(newUser);
    }
})