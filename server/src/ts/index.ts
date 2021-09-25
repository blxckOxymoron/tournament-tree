import { createServer } from "http";
import express from "express";
import { config } from "dotenv";
import { env } from "process";
import { Server } from "socket.io";
import { MutationData, RootBranch, TransmittedState } from "./types";
import { ConfigTeam } from "./types";
import { readFileSync } from 'fs'
config();

const TransmittedMutations = {
  MOVE_TEAM: "moveTeam",
}
const Mutations = {
  REGISTER_SLOT: "registerSlot",
  REGISTER_TEAM: "registerTeam",
  MOVE_TEAM: "moveTeam",
  MARK_SNAP_SLOT: "markSnapSlot",
  SET_ALL: "setAll",
}

const app = express();
const server = createServer(app);
const io = new Server(server);

const tournamentConfig = JSON.parse(readFileSync("./config.json").toString());
const teamsTemplate: ConfigTeam[] = tournamentConfig.teamsTemplate;
const tree: RootBranch = tournamentConfig.tree;
const adminId: string = tournamentConfig.adminId;

let teams = teamsTemplate.map((team, i) => {
  return {
    slotId: -1,
    ...team,
    id: i,
  }
})

app.use(express.static("public"));

app.all("/online", (_req, res) => {
  res.json({ status: "yes.", STATUS: "YES." });
});

io.on("connection", (socket) => {
  //* send current state => branches, teams, slots
  let state: TransmittedState = {
    teams,
    isAdmin: socket.client.request.headers["admin"] === adminId,
    tree,
  }
  socket.emit("mutation", {
    name: Mutations.SET_ALL,
    payload: { state }
  })
  //* handle Mutations

  socket.on("mutation", (data: any) => {
    if (socket.client.request.headers["admin"] !== adminId) return;
    if (!('name' in data && 'payload' in data)) return;
    if (!Object.values(TransmittedMutations).includes(data.name)) return;

    if (data.name === Mutations.MOVE_TEAM) moveTeam(data.payload);

    const mutationData: MutationData = {
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

server.listen(env["SERVER_PORT"] || 3000, () => {
  console.log("listening on *:" + env["SERVER_PORT"] || 3000);
});

function moveTeam(payload: { to: number; team: number; }): void {
  const team = teams.find((tm) => tm.id === payload.team);
  if (!team) return;
  team.slotId = payload.to
}
