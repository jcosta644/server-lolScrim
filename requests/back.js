"use strict";

require("dotenv").load();

const request = require("request");

const key = process.env.API_KEY;

module.exports = {
	getIdSummonerByName(name, region){
		let result = "";

		request('https://br.api.pvp.net/api/lol/'+ region +'/v1.4/summoner/by-name/'+ name + '?api_key='+ key, function (error, response, body) {
  			if (!error && response.statusCode == 200) {
    			let summoner =  JSON.parse(body);
    			//let summonerName = name.toLowerCase().split(' ').join('');
    			console.log(name);

    			result = summoner.name.id;
  			}
		});

		return result;
	}
}