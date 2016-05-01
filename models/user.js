"use strict";

const Promise = require("bluebird");
const mongoose = require("mongoose");

const UserSchema = require("./schemas/user.js");

let UserModel;

UserSchema.statics = {
	create(data) {
        let user = new UserModel(data);

        return user.save();
    },

    getByNomeInvocador(nomeInvocador) {
        return UserModel.findOne({nomeInvocador})
            .then(user => {
                if (user) {
                    return Promise.resolve(user);
                }
                return Promise.reject("Invocador não encontrado");
            });
    },

    updateUserById(id, mod) {
        const options = {
            new: true
        };

        mod.atualizadoEm = Date.now();

        return UserModel.findByIdAndUpdate(id, mod, options)
            .then(user => {
                if (user) {
                    return Promise.resolve(user);
                }
                return Promise.reject("Usuário não encontrado");
            });
    }
}

UserModel = module.exports = mongoose.model("User", UserSchema);