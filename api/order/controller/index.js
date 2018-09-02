const models = require("../../../models/index");
const jwt = require("jsonwebtoken");
const Order = models.order;
const User = models.user;
const Vieworder = models.vieworder;

const controller = {
  show: (req, res) => {
    const sequelize = require("sequelize");
    const op = sequelize.Op;
    const DevToken =
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer";
    if (DevToken) {
      const token = req.headers.authorization.split(" ")[1] || "";
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          res.status(417).send({
            message: "Token is invalid"
          });
        } else {
          req.decoded = decoded;
          let fullname = decoded.ufullname;
          let store_name = decoded.mstore_name;
          Vieworder.findAll({
            attributes: [
              "idorder",
              "fullname",
              "address",
              "phone_number",
              "notes",
              "store_name",
              "price",
              "quantities",
              "Total",
              "status"
            ],
            where: {
              [op.or]: [{ fullname: fullname }, { store_name: store_name }]
            }
          }).then(data => {
            res.status(200).send(data);
          });
        }
      });
    } else {
      res.status(400).send({
        message: "Please specify the token in request headers"
      });
    }
  },

  createOrder: (req, res) => {
    const {
      iduser,
      idmerchants,
      merchant,
      quantities,
      phone_number,
      user_address,
      user_notes
    } = req.body;
    if (iduser && merchant && quantities && phone_number && user_address) {
      User.findById(iduser).then(user => {
        if (user) {
          return Order.create({
            iduser,
            idmerchants,
            merchant,
            quantities,
            phone_number,
            user_address,
            user_notes,
            status: "Pending",
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
      res.status(417).send({ message: "Please fill all fields" });
    }
  },

  showOrderById: (req, res) => {
    const { id } = req.params;
    const sequelize = require("sequelize");
    const op = sequelize.Op;
    const DevToken =
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer";
    if (DevToken) {
      const token = req.headers.authorization.split(" ")[1] || "";
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          res.status(417).send({
            message: "Token is invalid"
          });
        } else {
          req.decoded = decoded;
          let fullname = decoded.ufullname;
          let store_name = decoded.mstore_name;
          Vieworder.findOne({
            attributes: [
              "idorder",
              "fullname",
              "address",
              "phone_number",
              "notes",
              "store_name",
              "price",
              "quantities",
              "Total",
              "status"
            ],
            where: {
              [op.or]: [{ fullname: fullname }, { store_name: store_name }],
              idorder: id
            }
          }).then(data => {
            if (data) {
              res.status(200).send(data);
            } else {
              res.status(404).send({
                message: "You dont have order by that id"
              });
            }
          });
        }
      });
    } else {
      res.status(400).send({
        message: "Please specify the token in request headers"
      });
    }
  },

  updateOrderStatus: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (id) {
      Order.findById(id).then(order => {
        if (order) {
          Order.update(
            {
              status
            },
            {
              where: {
                id
              }
            }
          )
            .then(order => {
              res.status(200).send({ message: "Status updated" });
            })
            .catch(error => res.status(500).send(error));
        } else {
          res.status(404).send({ message: "Order doesnt exist!" });
        }
      });
    } else {
      res.status(417).send({ message: "Please specify the Order ID" });
    }
  }
};

module.exports = controller;
