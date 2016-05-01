"use strict";

require("dotenv").load();

const API = {
	key: "?api_key=" + process.env.API_KEY,
	base_URL: "https://br.api.pvp.net/api/lol/",
	getSummonerByName: "/v1.4/summoner/by-name/",
	getSummonerById: "/v1.4/summoner/",
	getLeagueBySummonerId: "/v2.5/league/by-summoner/",
	getMatchListBySummonerId: "/v2.2/matchlist/by-summoner/",
	getChampionStatsBySummonerId: "/v1.3/stats/by-summoner/",
	filterRankedSeasontoMatchList: "?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5&seasons=SEASON2016&api_key=" + process.env.API_KEY,
	getChampionById: "/v1.2/champion/"
}

module.exports = API;