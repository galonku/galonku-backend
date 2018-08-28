const models = require("../../../models/index");
const Order = models.order;
const User = models.user;

const controller = {
  show: (req, res) => {
    Order.findAll().then(data => {
      res.status(200).send(data);
    });
  },

  createOrder: (req, res) => {
    const {
      iduser,
      merchant,
      quantity,
      phone_number,
      user_address,
      user_notes
    } = req.body;
    if (iduser && merchant && quantity && phone_number && user_address) {
      User.findById(iduser).then(user => {
        if (user) {
          return Order.create({
            iduser,
            merchant,
            quantity,
            phone_number,
            user_address,
            user_notes,
            createdAt: new Date() + 7,
            updatedAt: new Date() + 7
          })
            .then(newOrder => {
              Order.build(newOrder);
              res.status(200).send({
                message: "Order placed",
                data: newOrder
              });
            })
            .catch(err => {
              res.status(400).send({
                message: err
              });
            });
        } else {
          res.status(404).send({ message: "User doesnt exist" });
        }
      });
    } else {
      res.status(417).send({ message: "Please fill all parameters" });
    }
  }
};

module.exports = controller;
