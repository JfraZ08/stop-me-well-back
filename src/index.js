"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var express_1 = require("express");
var auth_1 = require("./router/auth");
var users_1 = require("./router/users");
var games_1 = require("./router/games");
var sequelize_1 = require("sequelize");
var body_parser_1 = require("body-parser");
var cors = require("cors");
var http_1 = require("http");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});
exports.sequelize.sync();
// sequelize.sync({ force: true});
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
var io = new http_1.Server(server);
app.use(cors());
app.use(body_parser_1.default.json());
var apiRouter = express_1.default.Router();
apiRouter.use('/auth', auth_1.authRoutes);
apiRouter.use('games', games_1.gamesRoutes);
apiRouter.use('/users', users_1.userRoutes);
server.use("/", apiRouter);
server.listen(process.env.PORT, function () {
    console.log("Example app listening on port ".concat(process.env.PORT, "!"));
});
