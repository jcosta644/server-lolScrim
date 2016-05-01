"use strict";

const Promise = require("bluebird");
const mongoose = require("mongoose");
const TeamSchema = require("./schemas/team.js");

let TeamModel;

TeamSchema.statics = {
	create(data) {
        let user = new UsuarioModel(data);

        return user.save();
    },

TeamModel = module.exports = mongoose.model("Team", TeamSchema);