import express from 'express';
import { authRoutes } from './router/auth';
import { IUser,userRoutes } from './router/users';
import { gamesRoutes }from './router/games';
import { Sequelize } from "sequelize";
import  bodyParser  from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { UserModel } from "./modele/User";
import { GameModel } from "./modele/gameModel";
import { Server } from "socket.io";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
  });


sequelize.sync();
// sequelize.sync({ force: true});

const app = express();
const server = createServer(app);
const io = new Server(server);

export const User = UserModel(sequelize)
export const Game = GameModel(sequelize)
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('games', gamesRoutes );
apiRouter.use('/users', userRoutes);

app.use("/", apiRouter);


let winner: any;
let tempsLePlusProche: any;
let joueurs:IUser[]=[];

io.on('connection', (socket) => {
    socket.on('ready', () => {
        
        let objectif = Math.floor(Math.random()*10);
        joueurs.push({id:socket.id, time:0});
        
        if (joueurs.length==2){
            socket.emit('game-start', objectif);
        }
        
        const starttime = new Date().getTime();
        socket.on('play', async () => {
            
            
            const endtime = new Date().getTime();
            
            let convertionTime = (endtime-starttime)*1000;
            const joueurCourant = joueurs.find(joueur => joueur.id === socket.id);
            
            if (joueurCourant){
                joueurCourant.time= convertionTime;
            }
            
            if((objectif - joueurs[0].time) < (objectif - joueurs[1].time)){
                winner=joueurs[0].id;
                tempsLePlusProche = joueurs[0].time;
            }else{
                winner=joueurs[1].id;
                tempsLePlusProche = joueurs[1].time;
            }
            
            await Game.create({ joueur1:joueurs[0].id, 
                joueur2:joueurs[1].id,
                winner:winner,
                bestTime:tempsLePlusProche,
                objectif:objectif});
                
                socket.emit('game-end',winner, tempsLePlusProche);
                joueurs.splice(0, joueurs.length);
            });
        });
    });
    
server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
});
  