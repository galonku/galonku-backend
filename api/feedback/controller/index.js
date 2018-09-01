const models = require("../../../models/index");
const Feedback = models.feedback

const controller ={
    show:(req,res) =>{
        Feedback.findAll()
        .then(feedback => res.status(200).send(feedback))
    }
}

module.exports = controller