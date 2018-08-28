const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const models = require('../../../models/index')
const Merchant = models.merchant

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
    show: async (req, res, next) => {
        Merchant
            .findAll()
            .then(merchants => {
                res.status(200).send(merchants)
            })
    },

    searchMerchants: async (req, res) => {
        const keyword = req.query.q
        const sequelize = require('sequelize')
        const op = sequelize.Op

        if (keyword) {
            Merchant
                .findAll({
                    where: {
                        store_name: {
                            [op.like]: `%${keyword}%`
                        }
                    }
                })
                .then(merchant => {
                    if (merchant) {
                        res.status(200).send({
                            merchant
                        })
                    } else {
                        res.status(404).send({
                            message: "Merchant doesnt exist!"
                        })
                    }
                })
        }
    },

    register: async (req, res, next) => {
        const {
            username, store_name,
            email, password,
            phone_number, identity_number,
            address } = req.body
        if (username && store_name && email && password && phone_number && identity_number && address) {
            const saltRounds = 5
            bcrypt
                .hash(password, saltRounds)
                .then(hash => {
                    return {
                        username, store_name,
                        email, password: hash,
                        phone_number, identity_number, address,
                        createdAt: new Date() + 7,
                        updatedAt: new Date() + 7
                    }
                })
                .then(newMerchant => {
                    Merchant
                        .build(newMerchant)
                        .save()
                        .then(merchants => {
                            const { username, store_name, email, address, createdAt } = merchants
                            res.status(200).send({
                                message: "Your merchant account successfully registered!",
                                data: {
                                    username, store_name,
                                    email, address, createdAt
                                }
                            })
                        })
                        .catch(err => {
                            res.status(400).send({
                                message: err
                            })
                        })
                })
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body
        if (username && password) {
            Merchant
                .findOne({
                    where: {
                        username: username
                    }
                })
                .then(merchant => {
                    if (merchant) {
                        const token = jwt.sign({
                            username, store_name: merchant.store_name
                        },
                            ENV, {
                                expiresIn: '12h'
                            })

                        bcrypt
                            .compare(password, merchant.password)
                            .then(response => {
                                if (response) {
                                    res.status(200).send({
                                        message: "Login successful",
                                        token
                                    })
                                } else {
                                   res.status(417).send({
                                        message: "Wrong Password!!"
                                    }) 
                                }
                            })
                    } else {
                        res.status(404).send({ message: "Sorry, username and password doesnt exist. Please register before login!" })
                    }
                })
        } else {
            res.status(417).send({
                message: "Please specify username and password!"
            })
        }
    },

    logout: async (req, res) => {
        res.status(200).send({ message: "Successfully logout!" })
    },

    editProfile: async (req, res) => {
        const id = req.params.id
        const { password, store_name, address, email, phone_number } = req.body

        if (id) {
            Merchant.findById(id)
                .then(merchant => {
                    if (merchant) {
                        const saltRounds = 5
                        bcrypt.hash(password, saltRounds)
                            .then(hash => {
                                return {
                                    store_name,email, password: hash,
                                    phone_number, address,
                                    createdAt: new Date() + 7,
                                    updatedAt: new Date() + 7
                                }
                            }).then(updatedMerchants => {
                                Merchant.update(
                                    updatedMerchants
                                , { where: { id: id } })
                                    .then(() => {
                                        res.status(200).send({ message: "Updating success" })
                                    })
                            })
                    }
                })
        } else res.status(417).send({ message: "Please specify Merchant ID then input your account password!" })
    },

    deleteAccount: async (req, res) => {
        const id = Number(req.params.id)
        const { password } = req.body
        if (id) {
            Merchant.findById(id)
                .then(merchants => {
                    if (merchants) {
                        if (password) {
                            bcrypt
                                .compare(password, merchants.password)
                                .then(result => {
                                    if (result) {
                                        Merchant
                                            .destroy({ where: { id: id } })
                                            .then(() => res.status(200).send({ message: "Your account successfully deleted!" }))
                                    } else {
                                        res.status(417).send({ message: "Password is incorrect!" })
                                    }
                                })
                        } else res.status(404).send({ message: "Please specify the password!" })
                    } else res.status(404).send({ message: "Merchants doesnt exist!" })
                })
        } else res.status(417).send({ message: "Please specify Merchant ID then input your account password!" })
    }
}

module.exports = controller
