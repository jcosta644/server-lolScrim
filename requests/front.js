"use strict";

require("dotenv").load();

const request = require("request");

const key = process.env.API_KEY;

module.exports = {
    getSummonerByName(req, res){
		let name = req.body.name;
		let region = req.body.region;

		request('https://br.api.pvp.net/api/lol/'+ region +'/v1.4/summoner/by-name/'+ name + '?api_key='+ key, function (error, response, body) {
  			if (!error && response.statusCode == 200) {
    			res.json(JSON.parse(body));
  			}
		});
	},

	getRankedLeague(req, res){
		let id = req.body.id;
		let region = req.body.region;

		request('https://br.api.pvp.net/api/lol/'+ region +'/v2.5/league/by-summoner/'+ id + '/entry?api_key='+ key, function (error, response, body) {
			if(!error && response.statusCode == 200) {
				res.json(JSON.parse(body));
			}
		});
	},

	getChampionStatsBySummonerId(req, res){
		let id = req.body.id;
		let region = req.body.region;
		let lane = req.body.lane;

		request('https://br.api.pvp.net/api/lol/'+ region +'/v1.3/stats/by-summoner/'+ id + '/ranked?api_key='+ key, function (error, response, body) {
			if(!error && response.statusCode == 200) {
				let stats = JSON.parse(body);			
				stats.champions.forEach(function(item, index){
					if(item.id == 0){
						stats.champions.splice(index,1);
					}
				});

				stats.champions.sort(function(a,b) {
			    	return a.stats.totalSessionsPlayed < b.stats.totalSessionsPlayed ? -1 : a.stats.totalSessionsPlayed > b.stats.totalSessionsPlayed ? 1 : 0;
				});

				res.json(stats.champions.slice(-3));
			}
		});
	}

}
