"use strict";

require("dotenv").load();

const mongoose = require("mongoose");
const Promise = require("bluebird");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var request = require('request');

const port = process.env.PORT || 8000;
const db = process.env.DB_HOST;
const key = process.env.API_KEY;

mongoose.connect(db);
mongoose.Promise = Promise;
mongoose.set("debug", true);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(port);
