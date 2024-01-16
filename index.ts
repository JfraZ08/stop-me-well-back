import express from "express";
import { Socket } from "socket.io-client";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { User } from '..';
import { Routeur } from "express"
import { Sequelize, DataTypes } from 'sequelize';
import jwt from 'jsonwebtoken'

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

const userRouter = Routeur();

userRouter.post('http://localhost:3012/auth/connect', async (req, res) => {
    const findUser = await User.findOne
})

server.listen(3000, () => {
    console.log('server running at http://localhost: 3000');
  });