const express = require("express");
const routes = require('./routes');
const cors = require("cors");

const app = express();
app.use(cors());
// app.options('/*any', cors());
app.use(express.json())
app.use('/ordernowApi/v1', routes);

module.exports = app;