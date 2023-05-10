const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const socketIo = require("socket.io");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const port = process.env.port || 3300;

dotenv.config();

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.io = io;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("hello word");
});
const { codeRouters, socketRouters, userRouters } = require("./routers");

app.use("/api", codeRouters);
app.use("/user", userRouters);

io.on("connection", (socket) => socketRouters(socket, io));

server.listen(port, () => console.log(`this server running on port ${port}`));