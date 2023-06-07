const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const bearerToken = require("express-bearer-token");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");

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
  messageRouters,
} = require("./routers");

app.use("/user", userRouters);
app.use("/article", articleRouters);
app.use("/sessions", sessionRouters);
app.use("/messages", messageRouters);

io.use((socket, next) => {
  if (socket.handshake.headers && socket.handshake.headers.authorization)
    jwt.verify(
      socket.handshake.headers.authorization.split("Bearer ")[1],
      process.env.TOKEN_KEY,
      (err, decoded) => {
        if (err) return next(new Error("Authentication error"));

        socket.user = decoded;
        next();
      }
    );
  else return next(new Error("Authentication error"));
}).on("connection", (socket) => socketRouters(socket, io));

const port = 8081;
server.listen(port, () => console.log(`this server running on port ${port}`));
