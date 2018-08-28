const models = require("../../../models/order");
const Order = models.order;

const controller = {
  show: (req, res) => {
    Order.findAll().then(data => {
      res.status(200).send(data);
    });
  },

  createOrder: (req, res) => {
    const {
      merchant,
      quantity,
      phone_number,
      user_address,
      user_notes
    } = req.body;
    if (merchant && quantity && phone_number && user_address) {
      return {
        merchant,
        quantity,
        phone_number,
        user_address,
        user_notes
      }.then(newOrder => {
        Order.build(newOrder)
          .save()
          .then(order => {
            const {
              merchant,
              quantity,
              phone_number,
              user_address,
              user_notes
            } = order;
            res.status(200).send({
              message: "Order placed",
              data: {
                merchant,
                quantity,
                phone_number,
                user_address,
                user_notes
              }
            });
          })
          .catch(err => {
            res.status(400).send({
              message: err
            });
          });
      });
    }
  }
};
