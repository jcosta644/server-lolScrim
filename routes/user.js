"use strict";

const express = require("express");
const router = new express.Router();

const UserCtrl = require("../controllers/user");

router.route("/")
	.post(UserCtrl.create);

module.exports = router;