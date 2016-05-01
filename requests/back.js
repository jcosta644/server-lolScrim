"use strict";

require("dotenv").load();

const request = require("request");

const API = {
	key: "?api_key=" + process.env.API_KEY,
	base_URL: "https://br.api.pvp.net/api/lol/",
	getSummonerByName: "/v1.4/summoner/by-name/"
}

module.exports = {
	getIdSummonerByName(name, region, cb){
		let result;

		request(
			API.base_URL + region + API.getSummonerByName + name + API.key, 
				function (error, response, body) {
  					if (!error && response.statusCode == 200) {
						let summonerName = name.toLowerCase().split(' ').join('');

  						cb(JSON.parse(body)[summonerName].id);
  					} else {
  						cb("ID não encontrado");
  					}
			});
	}
}