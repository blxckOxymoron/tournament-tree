import { createServer } from "http";
import express from 'express';
import { config } from 'dotenv';
config();

const app = express()
const server = createServer(app);

server.listen(process.env['SERVER_PORT'] || 3000, () => {
  console.log("listening on port: ", process.env['SERVER_PORT'] || 3000)
})