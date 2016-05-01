"use strict";

require("dotenv").load();

const request = require("request");
const API = require("./API");

module.exports = {
    getSummonerByName(req, res){
		let name = req.body.name;
		let region = req.body.region;

		request(
			API.base_URL + region + API.getSummonerByName + name + API.key,
				function (error, response, body) {
		  			if (!error && response.statusCode == 200) {
		    			res.json(JSON.parse(body));
		  			}
			});
	},

	getRankedLeague(req, res){
		let id = req.body.id;
		let region = req.body.region;

		request(
			API.base_URL + region + API.getLeagueBySummonerId + id + '/entry' + API.key,
				function (error, response, body) {
					if(!error && response.statusCode == 200) {
						res.json(JSON.parse(body));
					}
			});
	},

	getChampionStatsBySummonerId(req, res){
		let id = req.body.id;
		let region = req.body.region;
		let lane = req.body.lane; //LANES: DUO_SUPPORT, DUO_CARRY, MID ,JUNGLE, TOP
		let matchListLane = [],exist;

		request(
			API.base_URL + region + API.getMatchListBySummonerId + id + API.filterRankedSeasontoMatchList,
				function(error, response, body){
					if(!error && response.statusCode == 200) {
						let match = JSON.parse(body);
						match.matches.forEach(function(item, index){
							if(item.lane == lane || item.role == lane){
								matchListLane.push(item);
							}
						});
						request(
							API.base_URL + region + API.getChampionStatsBySummonerId + id + '/ranked' + API.key,
								function (error, response, body) {
									if(!error && response.statusCode == 200) {
										let stats = JSON.parse(body), matchList = [];
											matchListLane.forEach(function(item, index){
												stats.champions.forEach(function(element, index){
													if(item.champion == element.id && element.id != 0){
														exist = false;
														matchList.forEach(function(match, index){
															if(element.id == match.id){
																exist = true;
															}
														});
														if(!exist){
															matchList.push(element);
														}
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
		});
	}


}
