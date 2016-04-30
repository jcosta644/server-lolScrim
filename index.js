"use strict";

require("dotenv").load();

const mongoose = require("mongoose");
const Promise = require("bluebird");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const LolApi = require('leagueapi');

const port = process.env.PORT || 8000;
const db = process.env.DB_HOST;
const key = process.env.API_KEY;

mongoose.connect(db);
mongoose.Promise = Promise;
mongoose.set("debug", true);

LolApi.init(key, 'br');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var region = function (req,res){
	LolApi.getRegions()
		.then(function (regions) {
    		res.status(200).json(regions);
	});
}

var summoner = function(req,res){
	LolApi.Summoner.getByName(req.body.name,req.body.region)
		.then(function(summonerData){
			res.status(200).json(summonerData);
	});
}

app.get("/", region);
app.post("/", summoner);
app.listen(port);
