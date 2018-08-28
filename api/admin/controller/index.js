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

const environment = process.env.NODE_ENV
let ENV
if (environment === 'development') ENV = process.env.DEVELOPMENT_JWT_SECRET
else if (environment === 'production') ENV = process.env.PRODUCTION_JWT_SECRET
 
const controller = {
    show: async (req, res) => {
        Admin
            .findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    },

    register: async (req, res, next) => {
        const { username, password, email, fullname } = req.body
        if (username && password && email && fullname) {
            const saltRounds = 5
            bcrypt.hash(password, saltRounds)
                .then(hash => { return { username, password: hash, email, fullname } })
                .then(newAdmins => {
                    Admin.build(newAdmins)
                        .save()
                        .then(admin => {
                            const { username, email, fullname } = admin
                            res.status(200).send({
                                message: "Your Admin account successfully registered",
                                data: {
                                    username, email, fullname
                                }
                            })
                        })
                })
        }
    },

    login: async (req, res) => {
        const {username,password} = req.body
        if (username && password) {
            Admin.findOne({
                where: {
                    username
                }
            })
                .then(admin => {
                    if(admin){
                        const { id, fullname, username, email } = admin
                        const token = jwt.sign({
                                id, fullname,
                                username, email
                        },
                            ENV, {
                                expiresIn: '1d'
                            }
                        )
                        bcrypt
                            .compare(password, admin.password)
                            .then(Response => {
                                if (Response) {
                                    res.status(200).send({
                                        message: `Successfully Login!, Welcome admin ${admin.fullname}`,
                                        token
                                    })
                                } else {
                                    res.status(417).send({
                                         message: "Wrong Password!!"
                                     }) 
                                 }
                            })
                    }else res.status(404).send({ message: "Sorry, username and password doesnt exist. Please register before login!" })
                }).catch(err => res.status(400).send(err))
        } else {
            res.status(400).send({
                message: "Username or Password is wrong"
            })

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
