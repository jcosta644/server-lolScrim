"use strict";

const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
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
    }
});

module.exports = UsuarioSchema;