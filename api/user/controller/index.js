const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("../../../models/index");
const User = models.user;
const Logging = models.logging;

const controller = {
  show: (req, res) => {
    User.findAll({ attributes: { exclude: ['password'] } }).then(data => res.status(200).send(data));
  },

  searchUser: async (req, res) => {
    const keyword = req.query.q;
    const sequelize = require("sequelize");
    const op = sequelize.Op;

    if (keyword) {
      User.findAll({
        attributes:{
          exclude:['password']
        },
        where: {
          username: {
            [op.like]: `%${keyword}%`
          }  
        }
      }).then(user => {
        if (user) {
          res.status(200).send({
            user
          });
        } else {
          res.status(404).send({
            message: "User doesnt exist"
          });
        }
      });
    }
  },

  register: (req, res) => {
    const {
      username,
      email,
      password,
      fullname,
      phone_number,
      address
    } = req.body;
    const sequelize = require("sequelize");
    const op = sequelize.Op;

    if (username && email && password && fullname && phone_number && address) {
      User.findOne({
        where: {
          [op.or]: [{ username: username }, { email: email }]
        }
      }).then(user => {
        if (!user) {
          const saltRounds = 5;
          bcrypt
            .hash(password, saltRounds)
            .then(hash => {
              return {
                username,
                email,
                password: hash,
                fullname,
                phone_number,
                address,
                createdAt: new Date() + 7,
                updatedAt: new Date() + 7
              };
            })
            .then(newUser => {
              User.build(newUser)
                .save()
                .then(user => {
                  const {
                    username,
                    email,
                    fullname,
                    address,
                    createdAt
                  } = user;
                  res.status(200).send({
                    message: "User account successfully registered!",
                    data: {
                      username,
                      email,
                      fullname,
                      address,
                      createdAt
                    }
                  });
                })
                .catch(err => {
                  res.status(400).send({
                    message: err
                  });
                });
            });
        } else {
          res.status(417).send({ message: "username or email exist" });
        }
      });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      User.findOne({
        where: {
          username: username
        }
      }).then(user => {
        if (user) {
          bcrypt.compare(password, user.password).then(response => {
            if (response) {
              const token = jwt.sign(
                {
                  username,
                  role: "user"
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "12h"
                }
              );

              res.status(200).send({
                message: "User session",
                role: "user",
                username,
                token
              });
              return Logging.create({
                iduser: user.id,
                username: user.username,
                role: "user",
                token,
                createdAt: new Date() + 7,
                updatedAt: new Date() + 7
              }).then(newLog => {
                Logging.build(newLog);
              });
            } else {
              res.status(417).send({
                message: "Wrong Password!!"
              });
            }
          });
        } else {
          res.status(404).send({
            message:
              "Sorry, username and password doesnt exist. Please register before login!"
          });
        }
      });
    } else {
      res.status(417).send({
        message: "Please specify username and password"
      });
    }
  },

  updateProfile: (req, res) => {
    const { id } = req.params;
    const { password, email, fullname, phone_number, address } = req.body;

    if (id) {
      User.findOne({
        where: {
          id: id
        }
      }).then(user => {
        if (user) {
          if (password && email) {
            const saltRounds = 5;
            bcrypt
              .hash(password, saltRounds)
              .then(hash => {
                User.update(
                  {
                    email,
                    password: hash,
                    fullname,
                    phone_number,
                    address,
                    updatedAt: new Date() + 7
                  },
                  { where: { id: id } }
                );
              })
              .then(() => {
                res.status(200).send({
                  message: "Profile updated"
                });
              });
          } else {
            res.status(417).send({
              message: "Please specify password field and email"
            });
          }
        } else {
          res.status(417).send({
            message: "No user found"
          });
        }
      });
    } else {
      res.status(417).send({
        message: "Please specify User ID"
      });
    }
  },

  logout: async (req, res) => {
    res.status(200).send({ message: "Logout successdul" });
  },

  deleteAccount: async (req, res) => {
    const id = Number(req.params.id);
    const { password } = req.body;
    if (id) {
      User.findById(id).then(users => {
        if (users) {
          if (password) {
            bcrypt.compare(password, users.password).then(response => {
              if (response) {
                User.destroy({ where: { id: id } }).then(() =>
                  res.status(200).send({ message: "Account deleted" })
                );
              } else {
                res.status(404).send({
                  message: "Wrong password"
                });
              }
            });
          } else {
            res.status(417).send({ message: "Please input password" });
          }
        } else {
          res.status(404).send({ message: "User doesnt exist" });
        }
      });
    } else res.status(417).send({ message: "Please specify User ID" });
  }
};

module.exports = controller;
