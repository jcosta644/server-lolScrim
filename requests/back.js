"use strict";

const request = require("request");

const API = require("./API");

module.exports = {
	getIdSummonerByName(name, region, cb){
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