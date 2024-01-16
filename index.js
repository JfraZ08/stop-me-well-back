"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_http_1 = require("node:http");
var socket_io_1 = require("socket.io");
// import jwt from 'jsonwebtoken'
var saltRounds = 10;
var app = (0, express_1.Express)();
var server = (0, node_http_1.createServer)(app);
var io = new socket_io_1.Server(server);
var Players = [];
var nbTurns = 0;
io.on('connection', function (socket) {
    Players.push(socket);
    if (Players.length === 2) {
        console.log('partieprete');
    }
});
server.listen(3000, function () {
    console.log('server running at http://localhost: 3000');
});
function compare(password, password1) {
    throw new Error("Function not implemented.");
}
