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
  
const controller = {
    show: (req, res, next) => {
        Merchant
            .findAll()
            .then(data => res.status(200).send(data))
    },

    searchMerchants: (req, res) => {
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

    register: (req, res, next) => {
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
                        identity_number, address
                    }
                })
                .then(newMerchant => {
                    Merchant
                        .build(newMerchant)
                        .save()
                        .then(merchants => {
                            const { username, store_name, email, address } = merchants
                            res.status(200).send({
                                message: "Your merchant account successfully registered!",
                                data: {
                                    username, store_name,
                                    email, address
                                }
                            })
                        })
                })
        }
    },

    login: (req, res) => {
        const { username, password } = req.body
        if (username && password) {
            Merchant
                .findOne({
                    where: {
                        username: username
                    }
                })
                .then(merchant => {
                    if(merchant){
                        const token = jwt.sign({
                            username, store_name: merchant.store_name
                        },
                            process.env.DEVELOPMENT_JWT_SECRET, {
                                expiresIn: '12h'
                            })
    
                        bcrypt
                            .compare(password, merchant.password)
                            .then(response => {
                                console.log(response)
                                console.log("jwt key:" + process.env.DEVELOPMENT_JWT_SECRET)
                                if (response) {                                
                                    res.status(200).send({
                                        message: "Login successfully",
                                        token
                                    })
                                } else {
                                    res.status(417).send({
                                        message: "Wrong Password!!"
                                    })
                                }
                            })
                    }else{
                        res.status(404).send({message:"Sorry, username and password doesnt exist. Please register before login!"})
                    }
                })
        } else {
            res.status(417).send({
                message: "Please specify username and password!"
            })
        }
    },
    deleteAccount: (req, res) => {
        const id = Number(req.params.id)
        const { password } = req.body
        if (id) {
            Merchant.findById(id)
                .then(merchants => {
                    if(merchants){
                        console.log("Merhants username: " + merchants.username)
                        if (merchants) {
                            if (password) {
                                bcrypt
                                    .compare(req.body.password, merchants.password)
    
                                    .then(result => {
                                        console.log("Merchants Password " + merchants.password)
                                        console.log("password " + password)
                                        console.log("Data: " + result);
    
                                        if (result) {
                                            Merchant
                                                .destroy({ where: { id: id } })
                                                .then(() => res.status(200).send({ message: "Your account successfully deleted!" }))
                                        } else {
                                            res.status(417).send({ message: "Password is incorrect!" })
                                        }
                                    })
                            } else res.status(404).send({ message: "Please specify the password!" })
                        }
                    }else{
                        res.status(404).send({message:"Merchants doesnt exist!"})
                    }
                })
        } else res.status(417).send({ message: "Please specify Merchant ID then input your account password!" })
    }
}

module.exports = controller