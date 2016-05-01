"use strict";

const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    nome: {
        type: String,

        unique: true,

        required: true
    },

    tag: {
        type: String,

        unique: true,

        required: true
    },

    capitao: {
        type: Schema.Types.ObjectId,

        ref: "Usuario",

        required: true
    },

    jogadores: [{
        _id: false,
        usuario: {
            type: Schema.Types.ObjectId,

            ref: "User",

            required: true
        },

        dataAdmissao: {
            type: Date
        }
    }],

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

module.exports = TeamSchema;