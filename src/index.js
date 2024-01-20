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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.User = exports.sequelize = void 0;
var express_1 = require("express");
var auth_1 = require("./router/auth");
var users_1 = require("./router/users");
var games_1 = require("./router/games");
var sequelize_1 = require("sequelize");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var http_1 = require("http");
var User_1 = require("./modele/User");
var gameModel_1 = require("./modele/gameModel");
var socket_io_1 = require("socket.io");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});
// sequelize.sync();
exports.sequelize.sync({ force: true });
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server);
exports.User = (0, User_1.UserModel)(exports.sequelize);
exports.Game = (0, gameModel_1.GameModel)(exports.sequelize);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
var apiRouter = express_1.default.Router();
apiRouter.use('/auth', auth_1.authRoutes);
apiRouter.use('games', games_1.gamesRoutes);
apiRouter.use('/users', users_1.userRoutes);
app.use("/", apiRouter);
var winner;
var tempsLePlusProche;
var joueurs = [];
io.on('connection', function (socket) {
    socket.on('ready', function () {
        var objectif = Math.floor(Math.random() * 10);
        joueurs.push({ id: socket.id, time: 0 });
        if (joueurs.length == 2) {
            socket.emit('game-start', objectif);
        }
        var starttime = new Date().getTime();
        socket.on('play', function () { return __awaiter(void 0, void 0, void 0, function () {
            var endtime, convertionTime, joueurCourant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endtime = new Date().getTime();
                        convertionTime = (endtime - starttime) * 1000;
                        joueurCourant = joueurs.find(function (joueur) { return joueur.id === socket.id; });
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
                        return [4 /*yield*/, exports.Game.create({ joueur1: joueurs[0].id,
                                joueur2: joueurs[1].id,
                                winner: winner,
                                bestTime: tempsLePlusProche,
                                objectif: objectif })];
                    case 1:
                        _a.sent();
                        socket.emit('game-end', winner, tempsLePlusProche);
                        joueurs.splice(0, joueurs.length);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
server.listen(process.env.PORT, function () {
    console.log("Example app listening on port ".concat(process.env.PORT, "!"));
});
