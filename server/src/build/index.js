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
const fs_1 = require("fs");
(0, dotenv_1.config)();
const TransmittedMutations = {
    MOVE_TEAM: "moveTeam",
};
const Mutations = {
    REGISTER_SLOT: "registerSlot",
    REGISTER_TEAM: "registerTeam",
    MOVE_TEAM: "moveTeam",
    MARK_SNAP_SLOT: "markSnapSlot",
    SET_ALL: "setAll",
};
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
const tournamentConfig = JSON.parse((0, fs_1.readFileSync)("./config.json").toString());
const teamsTemplate = tournamentConfig.teamsTemplate;
const tree = tournamentConfig.tree;
const adminId = tournamentConfig.adminId;
let teams = teamsTemplate.map((team, i) => {
    return {
        slotId: -1,
        ...team,
        id: i,
    };
});
app.use(express_1.default.static("public"));
app.all("/online", (_req, res) => {
    res.json({ status: "yes.", STATUS: "YES." });
});
io.on("connection", (socket) => {
    //* send current state => branches, teams, slots
    let state = {
        teams,
        isAdmin: socket.client.request.headers["admin"] === adminId,
        tree,
    };
    socket.emit("mutation", {
        name: Mutations.SET_ALL,
        payload: { state }
    });
    //* handle Mutations
    socket.on("mutation", (data) => {
        if (socket.client.request.headers["admin"] !== adminId)
            return;
        if (!('name' in data && 'payload' in data))
            return;
        if (!Object.values(TransmittedMutations).includes(data.name))
            return;
        if (data.name === Mutations.MOVE_TEAM)
            moveTeam(data.payload);
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
function moveTeam(payload) {
    const team = teams.find((tm) => tm.id === payload.team);
    if (!team)
        return;
    team.slotId = payload.to;
}
//# sourceMappingURL=index.js.map