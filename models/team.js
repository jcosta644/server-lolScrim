"use strict";

const Promise = require("bluebird");
const mongoose = require("mongoose");
const TeamSchema = require("./schemas/team.js");

let TeamModel;

TeamSchema.statics = {
	create(data) {
        let team = new TeamModel(data);

        return team.save();
    },

TeamModel = module.exports = mongoose.model("Team", TeamSchema);