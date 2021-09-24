import { createServer } from "http";
import express from "express";
import { config } from "dotenv";
import { env } from "process";
import { Server } from "socket.io";
import { Branch, MutationData, RootBranch, State, Team, TransmittedMutations } from "./appTypes";

config();

const app = express();
const server = createServer(app);
const io = new Server(server);
// crypto.randomBytes(32).toString('hex')
const adminId =
  "3ff8d9c6fa86e7f47bc0309d8600bb4af3e7bfdc302f354ea4b376aa4544503b";
let teams: Team[] = [
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
let wmBranch: Branch = {
  sub: Array<Branch>(2).fill({
    sub: Array<Branch>(2).fill({
      sub: Array<Branch>(2).fill({
        sub: [],
      }),
    }),
  }),
};
let tree: RootBranch = {
  sub: [wmBranch, wmBranch],
};

let store: State = {

}


app.use(express.static("public"));

app.all("/online", (_req, res) => {
  res.json({ status: "yes.", STATUS: "YES." });
});

io.on("connection", (socket) => {
  //* send current state => branches, teams, slots

  //* handle Mutations

  socket.on("mutation", (data) => {
    if (socket.client.request.headers["admin"] !== adminId) return;
    if (!Object.values(TransmittedMutations).find(data.name)) return;

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
