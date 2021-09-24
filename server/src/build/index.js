"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const process_1 = require("process");
const socket_io_1 = require("socket.io");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static("public"));
app.all("/online", (_req, res) => {
    res.json({ status: "yes.", STATUS: "YES." });
});
io.on('connection', (socket) => {
    console.log("cOnnected: " + socket.id);
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});
server.listen(process_1.env['SERVER_PORT'] || 3000, () => {
    console.log("listening on *:" + process_1.env['SERVER_PORT'] || 3000);
});
//# sourceMappingURL=index.js.map