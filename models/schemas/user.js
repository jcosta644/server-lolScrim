"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	login: {
        type: String,

        required: true,

        unique: true,
    },

    nomeInvocador: {
    	type: String,

    	required: true,

    	unique: true
    },

    idInvocador: {
        type: String,

        unique: true,

        required: true
    },

    email: {
        type: String,

        unique: true,

        sparse: true,

        required: true
    },

    regiao: {
    	type: String,

    	required: true
    },

    criadoEm: {
        type: Date,

        default: Date.now
    },

    atualizadoEm: {
        type: Date,

        default: Date.now,

        set: Date.now,

        index: true
    }
});

module.exports = UserSchema;