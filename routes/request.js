"use strict";

const express = require("express");
const router = new express.Router();

const ApiLol = require("../requests/front");

router.route("/champion")
	.post(ApiLol.getChampionById);

router.route("/champion")
	.get(ApiLol.test);

router.route("/summoner")
	.post(ApiLol.getSummonerByName);

router.route("/championstats")
	.post(ApiLol.getChampionStatsBySummonerId);

router.route("/league")
	.post(ApiLol.getRankedLeague);

router.route("/recent-matches")
	.post(ApiLol.getRecentGames);

module.exports = router;