const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const bearerToken = require("express-bearer-token");

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
app.use(bearerToken());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("hello word");
});
const {
  userRouters,
  socketRouters,
  articleRouters,
  sessionRouters,
} = require("./routers");

app.use("/user", userRouters);
app.use("/article", articleRouters);
app.use("/sessions", sessionRouters);

io.on("connection", (socket) => socketRouters(socket, io));

server.listen(port, () => console.log(`this server running on port ${port}`));
