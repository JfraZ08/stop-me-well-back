import express, { Router } from "express";
import { Socket } from "socket.io-client";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { User } from '..';
import { Sequelize, DataTypes } from 'sequelize';
import jwt from 'jsonwebtoken'

const saltRounds = 10;
const app = express();
const server = createServer(app);
const io = new Server(server);
let Players: any[] = [];
let nbTurns = 0;

io.on('connection', (socket) => {
    Players.push(socket)
    if(Players.length===2){
        console.log('partieprete')
    }
});

export const userRouter = Router();

userRouter.post('chemin', async (req, res) => {
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
           res.status(400).json({error : "message"})
        }
    }
})

userRouter.post('chemin', async (req, res) => {
    console.log('res', req.body)
    const findUser = await User.findOne( { where : { req.body.identifier }})
    if(findUser){
        res.status(400).json('utilisateur existe déjà')
    }else{
        const hash = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = await User.create({
            email : req.body.identifier,
            password : hash
        })
        res.json(newUser);
    }
})



server.listen(3000, () => {
    console.log('server running at http://localhost: 3000');
  });

function compare(password: any, password1: any) {
    throw new Error("Function not implemented.");
}
