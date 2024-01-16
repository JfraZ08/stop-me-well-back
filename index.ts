import { express } from "express";
import { Socket } from "socket.io-client";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { DataTypes } from 'sequelize';
import { Sequelize } from "sequelize/types/sequelize";
import { showConnexion } from "./router/User";
// import jwt from 'jsonwebtoken'


const app = express();
const server = createServer(app);
const io = new Server(server);
let Players: any[] = [];

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
  });

  export const User = sequelize.define('user', {
      login : DataTypes.STRING,
      password : DataTypes.STRING
    }, {
      timestamps: false
    })
io.on('connection', (socket) => {
    Players.push(socket)
    if(Players.length===2){
        console.log('partieprete')
    }
});




server.listen(3000, () => {
    console.log('server running at http://localhost: 3000');
  });

function compare(password: any, password1: any) {
    throw new Error("Function not implemented.");
}
