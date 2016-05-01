"use strict";

const express = require("express");
const router = new express.Router();

const UserCtrl = require("../controllers/user");

router.route("/")
	.post(UserCtrl.create);

router.route("/:nomeInvocador")
	.get(UserCtrl.showMe)

router.route("/me")
	.put(UserCtrl.updateMe);

module.exports = router;