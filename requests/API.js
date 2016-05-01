"use strict";

require("dotenv").load();

const API = {
	key: "?api_key=" + process.env.API_KEY,
	base_URL: "https://br.api.pvp.net/api/lol/",
	getSummonerByName: "/v1.4/summoner/by-name/"
}

module.exports = API;