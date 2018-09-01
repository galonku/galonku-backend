const models = require("../../../models/index");
const jwt = require("jsonwebtoken");

const models = require('../../../models')
const Feedback = require(models.Feedback)

const controller = () =>{
    show:(req,res) =>{
        Feedback.findAll()
        .then(feedback => res.status(200).send(feedback))
    }
}

module.exports = controller