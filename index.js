const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

const { codeRouters } = require("./routers");
app.use("/api", codeRouters);

app.listen(port, () => console.log(`this server running on port ${port}`));
