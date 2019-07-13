const models = require("../../../models/index");
const Feedback = models.feedback

const controller ={
    show:(req,res) =>{
        Feedback.findAll()
        .then(feedback => res.status(200).send(feedback))
    },

    send:(req,res) =>{
        const {name,email,phone_number,comments} = req.body
        Feedback.create({
            name,email,phone_number,comments
        }).then(feedback => res.status(200).send({message:"Thank you for your feedback"}))        
    }
}

module.exports = controller