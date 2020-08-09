const express = require("express");
const routes = require("./src/routes");

const app = express();

app.use(express.static('public'))
app.use(routes);

module.exports = app;