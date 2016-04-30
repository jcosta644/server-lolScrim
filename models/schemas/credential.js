"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const CredentialSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,

        set(senha) {
            return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
        },

        required: true
    }
});

module.exports = CredentialSchema;