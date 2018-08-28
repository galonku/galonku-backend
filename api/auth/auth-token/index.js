const jwt = require('jsonwebtoken')

const controller = {
    valid: async (req, res) => {
        res.status(200).send({ message: "Token is valid!" })
    },

    verifyToken: async (req, res, next) => {
        const DevToken = req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'
        if (DevToken) {    
                const token = req.headers.authorization.split(' ')[1] || ''
                jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                    if (error) {
                        res.send(417).send({
                            message: "Token is invalid"
                        })
                    }else{
                        req.decoded = decoded
                        next()
                    }
                })
        } else {
            res.status(400).send({
                message: "Please specify your Developer token in request headers"
            })
        }
    }
}

module.exports = controller