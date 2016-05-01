"use strict";

const mongoose = require("mongoose");
const CredentialSchema = require("./schemas/credential");

let CredentialModel;

CredentialSchema.statics = {
    create(data) {
        const credential = new CredentialModel(data);

        return credential.save();
    }
};

CredentialModel = module.exports = mongoose.model("Credential", CredentialSchema);