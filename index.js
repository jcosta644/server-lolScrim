"use strict";

require("dotenv").load();

const mongoose = require("mongoose");
const Promise = require("bluebird");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routes");

const port = process.env.PORT || 8000;
const db = process.env.DB_HOST;

mongoose.connect(db);
mongoose.Promise = Promise;
mongoose.set("debug", true);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api/usuarios", routes.user);
app.use("/api/requisicoes", routes.request);

app.listen(port);
