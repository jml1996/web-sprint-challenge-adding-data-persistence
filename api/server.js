// build your server here
const express = require("express");
const helmet = require("helmet");

const ProjectRouter = require("./project/router.js");
const ResourceRouter = require("./resource/router.js");
const TaskRouter = require("./task/router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", ProjectRouter);
// server.use("/api/resources", ResourceRouter);
// server.use("/api/tasks", TaskRouter);

module.exports = server;
