"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.User = exports.sequelize = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("./router/auth");
const users_1 = require("./router/users");
const games_1 = require("./router/games");
const sequelize_1 = require("sequelize");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const User_1 = require("./modele/User");
const gameModel_1 = require("./modele/gameModel");
const socket_io_1 = require("socket.io");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});
exports.sequelize.sync();
// sequelize.sync({ force: true});
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
exports.User = (0, User_1.UserModel)(exports.sequelize);
exports.Game = (0, gameModel_1.GameModel)(exports.sequelize);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const apiRouter = express_1.default.Router();
apiRouter.use('/auth', auth_1.authRoutes);
apiRouter.use('games', games_1.gamesRoutes);
apiRouter.use('/users', users_1.userRoutes);
app.use("/", apiRouter);
let winner;
let tempsLePlusProche;
let joueurs = [];
io.on('connection', (socket) => {
    socket.on('ready', () => {
        let objectif = Math.floor(Math.random() * 10);
        joueurs.push({ id: socket.id, time: 0 });
        if (joueurs.length == 2) {
            socket.emit('game-start', objectif);
        }
        const starttime = new Date().getTime();
        socket.on('play', () => __awaiter(void 0, void 0, void 0, function* () {
            const endtime = new Date().getTime();
            let convertionTime = (endtime - starttime) * 1000;
            const joueurCourant = joueurs.find(joueur => joueur.id === socket.id);
            if (joueurCourant) {
                joueurCourant.time = convertionTime;
            }
            if ((objectif - joueurs[0].time) < (objectif - joueurs[1].time)) {
                winner = joueurs[0].id;
                tempsLePlusProche = joueurs[0].time;
            }
            else {
                winner = joueurs[1].id;
                tempsLePlusProche = joueurs[1].time;
            }
            yield exports.Game.create({ joueur1: joueurs[0].id,
                joueur2: joueurs[1].id,
                winner: winner,
                bestTime: tempsLePlusProche,
                objectif: objectif });
            socket.emit('game-end', winner, tempsLePlusProche);
            joueurs.splice(0, joueurs.length);
        }));
    });
});
server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});
