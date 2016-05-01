"use strict";

const express = require("express");
const router = new express.Router();

const ApiLol = require("../requests/front");

router.route("")
	.post(ApiLol.getChampionStatsBySummonerId);

module.exports = router;