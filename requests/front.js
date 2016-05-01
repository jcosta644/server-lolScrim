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
		let matchListLane = {}, exist;

		request('https://br.api.pvp.net/api/lol/'+ region +'/v2.2/matchlist/by-summoner/'+ id +'?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5&seasons=SEASON2016&api_key='+ key, function(error, response, body){
			if(!error && response.statusCode == 200) {
				let match = JSON.parse(body), matchListLane = {};
				matchList.matches.forEach(function(item, index){
					if(item.lane == lane || item.role == lane){
						exist = false;
						matchListLane.forEach(function(element, index){
							if(item.champion == element.champion){
								exist = true;
							}
						});
						if(!exist){
							matchListLane.push(item);
						}
					}
				});
			}
			console.log(matchListLane);
			res.json(matchListLane);

		});

		request('https://br.api.pvp.net/api/lol/'+ region +'/v1.3/stats/by-summoner/'+ id + '/ranked?api_key='+ key, function (error, response, body) {
			if(!error && response.statusCode == 200) {
				let stats = JSON.parse(body), matchList = {};
					matchListLane.forEach(function(item, index){
						stats.champions.forEach(function(element, index){
							if(item.champion == element.id && element.id != 0){
								matchList.push(element);
							}
						});
					});

				matchList.sort(function(a,b) {
				    return a.stats.totalSessionsPlayed < b.stats.totalSessionsPlayed ? -1 : a.stats.totalSessionsPlayed > b.stats.totalSessionsPlayed ? 1 : 0;
				});

				res.json(matchList.slice(-3));
			}
		});
	}


}
