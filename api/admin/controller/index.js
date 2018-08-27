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
        Admin
            .findAll()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
    },
   
    login: async (req, res) => {
        const {
            username,
            password
        } = req.body

        if (username && password) {
            Admin
                .findOne({
                    where: {
                        username
                    }
                })
                .then(admin => {
                    const { id, fullname, username, email } = admin
                    const token = jwt.sign({
                        data: {
                            id, fullname,
                            username, email
                        }
                    },
                        process.env.JWT_SECRET, {
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
                                res.status(400).send({
                                    message: "Sorry you dont have authorization to this page!"
                                })
                            }
                        })
                })
        } else {
            res.status(400).send({
                message: "Username or Password is wrong"
            })
        }
    },

    logout: async (req, res) => {
        res.status(200).send({
            message: "Successfully Logout!"
        })
    },
}

module.exports = controller