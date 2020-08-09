const express = require("express");
const app = express();

const routes = require("./routes");

const { port } = require("./config");

app.use(express.static('public'))
app.use(routes);
app.listen(port, () => console.log(`Server running at ${port}`));