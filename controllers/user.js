"use strict";

const UserModel = require("../models/user");
const CredentialModel = require("../models/credential");

const CREATED_STATUS_CODE = 201;
const NO_CONTENT_STATUS_CODE = 204;

module.exports = {

    create(req, res, next) {
        const data = req.body;

        CredentialModel.create(data)
            .then(() => UserModel.create(data))
            .then(user => {
                res.status(CREATED_STATUS_CODE).send("Criado com sucesso");
            })
            .catch(err => next(err));
    }

}