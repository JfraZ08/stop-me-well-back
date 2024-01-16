import { express } from "express";
import { Socket } from "socket.io-client";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { DataTypes } from 'sequelize';
import sequelize from "sequelize/types/sequelize";
import { showConnexion } from "./router/Connexion";
// import jwt from 'jsonwebtoken'

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

export const showConnexion = sequelize.define('connexion', {
    login : DataTypes.STRING,
    password : DataTypes.STRING
  }, {
    timestamps: false
  })



server.listen(3000, () => {
    console.log('server running at http://localhost: 3000');
  });

function compare(password: any, password1: any) {
    throw new Error("Function not implemented.");
}
