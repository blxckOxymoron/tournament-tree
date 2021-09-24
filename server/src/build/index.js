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
const appTypes_1 = require("./appTypes");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
// crypto.randomBytes(32).toString('hex')
const adminId = "3ff8d9c6fa86e7f47bc0309d8600bb4af3e7bfdc302f354ea4b376aa4544503b";
let teams = [
    {
        name: "yoooo team",
        color: "#9A879D",
    },
    {
        name: "TEAM 2 4 U",
        color: "#EF233C",
    },
    {
        name: "TEAM 2 4 U",
        color: "#D80032",
    },
    {
        name: "TEAM 2 4 U",
        color: "#A49966",
    },
    {
        name: "TEAM 2 4 U",
        color: "#FF570A",
    },
    {
        name: "yoooo team",
        color: "#9A879D",
    },
    {
        name: "TEAM 2 4 U",
        color: "#EF233C",
    },
    {
        name: "TEAM 2 4 U",
        color: "#D80032",
    },
    {
        name: "TEAM 2 4 U",
        color: "#A49966",
    },
    {
        name: "TEAM 2 4 U",
        color: "#FF570A",
    },
    {
        name: "yoooo team",
        color: "#9A879D",
    },
    {
        name: "TEAM 2 4 U",
        color: "#EF233C",
    },
    {
        name: "TEAM 2 4 U",
        color: "#D80032",
    },
    {
        name: "TEAM 2 4 U",
        color: "#A49966",
    },
    {
        name: "TEAM 2 4 U",
        color: "#FF570A",
    },
    {
        name: "W4F",
        color: "#12355B",
    },
];
let wmBranch = {
    sub: Array(2).fill({
        sub: Array(2).fill({
            sub: Array(2).fill({
                sub: [],
            }),
        }),
    }),
};
let tree = {
    sub: [wmBranch, wmBranch],
};
let store = {};
app.use(express_1.default.static("public"));
app.all("/online", (_req, res) => {
    res.json({ status: "yes.", STATUS: "YES." });
});
io.on("connection", (socket) => {
    //* send current state => branches, teams, slots
    //* handle Mutations
    socket.on("mutation", (data) => {
        if (socket.client.request.headers["admin"] !== adminId)
            return;
        if (!Object.values(appTypes_1.TransmittedMutations).find(data.name))
            return;
        const mutationData = {
            fromId: socket.id,
            name: data.name,
            payload: data.payload,
        };
        io.emit("mutation", mutationData);
    });
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});
server.listen(process_1.env["SERVER_PORT"] || 3000, () => {
    console.log("listening on *:" + process_1.env["SERVER_PORT"] || 3000);
});
//# sourceMappingURL=index.js.map