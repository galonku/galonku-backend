const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const models = require('../../../models/index')
const Admin = models.admin

require('dotenv-extended').load({
    encoding: 'utf8',
    silent: true,
    path: '.env',
    defaults: '.env.defaults',
    schema: '.env.schema',
    errorOnMissing: false,
    errorOnExtra: false,
    assignToProcessEnv: true,
    overrideProcessEnv: false
});

const controller = {
  show: (req, res) => {
    Admin.findAll().then(data => res.status(200).send(data));
  },
  register: (req, res) => {
    const {
      username,
      email,
      password,
      fullname,
      createdAt,
      updatedAt
    } = req.body;

    if (username && email && password && fullname) {
      const saltRounds = 5;
      bcrypt
        .hash(password, saltRounds)
        .then(hash => {
          return {
            username,
            email,
            password: hash,
            fullname,
            createdAt: new Date() + 7,
            updatedAt: new Date() + 7
          };
        })
        .then(newAdmin => {
          Admin.build(newAdmin)
            .save()
            .then(admin => {
              const { id, fullname, username, email } = admin;
              res.status(200).send({
                message: "Admin Created",
                admin: {
                  id,
                  fullname,
                  username,
                  email
                }
              });
            });
        });
    } else {
      res.status(400).send({
        message: "Please fill all the field!"
      });
    }
  },

  login: (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      Admin.findOne({
        where: {
          username
        }
      }).then(admin => {
        const { id, fullname, username, email } = admin;
        const token = jwt.sign(
          {
            data: {
              id,
              fullname,
              username,
              email
            }
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d"
          }
        );
        bcrypt.compare(password, admin.password).then(Response => {
          if (Response) {
            res.status(200).send({
              message: `Successfully Login!, Welcome admin ${admin.fullname}`,
              token
            });
          } else {
            res.status(400).send({
              message: "Sorry you dont have authorization to this page!"
            });
          }
        });
      });
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
