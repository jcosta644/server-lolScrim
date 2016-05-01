"use strict";

const Promise = require("bluebird");
const mongoose = require("mongoose");

const UserSchema = require("./schemas/user.js");

let UserModel;

UserSchema.statics = {
	create(data) {
        let user = new UserModel(data);
        
        return user.save();
    }
}

UserModel = module.exports = mongoose.model("User", UserSchema);