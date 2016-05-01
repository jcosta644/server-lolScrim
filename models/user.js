"use strict";

const Promise = require("bluebird");
const mongoose = require("mongoose");

const UserSchema = require("./schemas/user.js");
const ApiLol = require("../requests/back");

let UserModel;

UserSchema.statics = {
	create(data) {
        let user = new UserModel(data);
        user.idInvocador = ApiLol.getIdSummonerByName(data.nomeInvocador, data.regiao);

        return user.save();
    }
}

UserModel = module.exports = mongoose.model("User", UserSchema);