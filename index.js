const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const multer  = require('multer')

const bodyParser = require('body-parser');
const port = process.env.port || 3300


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))


app.get("/", (req,res) => {
    res.status(200).send("hello word")
})
const { codeRouters } = require("./routers");
app.use("/api", codeRouters);

app.listen(port, () => console.log(`this server running on port ${port}`));
