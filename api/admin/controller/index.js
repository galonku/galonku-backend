const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("../../../models/index");
const Admin = models.admin;
const Logging = models.logging;

require("dotenv-extended").load({
  encoding: "utf8",
  silent: true,
  path: ".env",
  defaults: ".env.defaults",
  schema: ".env.schema",
  errorOnMissing: false,
  errorOnExtra: false,
  assignToProcessEnv: true,
  overrideProcessEnv: false
});

const controller = {
  show: async (req, res) => {
    Admin.findAll({
      attributes: ["id", "username", "email", "fullname"]
    })
      .then(admins =>
        res.status(200).send({
          admins
        })
      )
      .catch(err => res.status(500).send(err));
  },

  register: async (req, res, next) => {
    const { username, password, email, fullname } = req.body;
    if (username && password && email && fullname) {
      const saltRounds = 5;
      bcrypt
        .hash(password, saltRounds)
        .then(hash => {
          return {
            username,
            password: hash,
            email,
            fullname,
            createdAt: new Date() + 7,
            updatedAt: new Date() + 7
          };
        })
        .then(newAdmins => {
          Admin.build(newAdmins)
            .save()
            .then(admin => {
              const { username, email, fullname } = admin;
              res.status(200).send({
                message: "Your Admin account successfully registered",
                data: {
                  username,
                  email,
                  fullname
                }
              });
            });
        });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      Admin.findOne({
        where: {
          username: username
        }
      })
        .then(admin => {
          if (admin) {
            bcrypt.compare(password, admin.password).then(response => {
              if (response) {
                const token = jwt.sign(
                  {
                    username,
                    role: "admin"
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "12h"
                  }
                );
                res.status(200).send({
                  message: "Admin session",
                  role: "admin",
                  username,
                  token
                });
                return Logging.create({
                  iduser: admin.id,
                  username: admin.username,
                  role: "admin",
                  token,
                  createdAt: new Date() + 7,
                  updatedAt: new Date() + 7
                }).then(newLog => {
                  Logging.build(newLog);
                });
              } else {
                res.status(417).send({
                  message: "Wrong Password"
                });
              }
            });
          } else
            res.status(404).send({
              message:
                "Sorry, username and password doesnt exist. Please register before login!"
            });
        })
        .catch(err => res.status(400).send(err));
    } else {
      res.status(400).send({
        message: "Username or Password is wrong"
      });
    }
  },

  updateProfile: (req, res) => {
    const { id } = req.params;
    const { password, email } = req.body;

    if (id) {
      if (password && email) {
        Admin.update(
          {
            password,
            email,
            updatedAt: new Date() + 7
          },
          { where: { id: id } }
        ).then(() => {
          res.status(200).send({
            message: "Successfully update your profile!"
          });
        });
      } else {
        res.status(417).send({
          message: "Please specify password field and email!"
        });
      }
    } else {
      res.status(417).send({
        message: "Please specify Admin ID!"
      });
    }
  },

  logout: (req, res) => {
    res.status(200).send({
      message: "Successfully Logout!"
    });
  },

  deleteAccount: (req, res) => {
    const id = Number(req.params.id);
    const { password } = req.body;
    if (id) {
      password
        ? Admin.destroy({ where: { id: id } })
        : res.send({ message: "Please specify the password!" });
    } else {
      res.status(417).send({ message: "Please specify Admin ID!" });
    }
  }
};

module.exports = controller;
