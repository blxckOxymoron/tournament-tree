import { createServer } from "http";
import express from 'express';
import { config } from 'dotenv';
import { env } from 'process';
import { Server } from 'socket.io';

config();

const app = express()
const server = createServer(app);
const io = new Server(server)

app.use(express.static("public"))

app.all("/online", (_req, res) => {
  res.json({ status: "yes.", STATUS: "YES." })
})

io.on('connection', (socket) => {

  console.log("cOnnected: " + socket.id)
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});
server.listen(env['SERVER_PORT'] || 3000, () => {
  console.log("listening on *:" + env['SERVER_PORT'] || 3000)
})