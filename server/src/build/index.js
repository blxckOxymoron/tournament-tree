"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
server.listen(process.env['SERVER_PORT'] || 3000, () => {
    console.log("listening on port: ", process.env['SERVER_PORT'] || 3000);
});
//# sourceMappingURL=index.js.map