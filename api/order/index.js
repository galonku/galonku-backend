const express = require("express");
const router = express.Router();

const controller = require("./controller/index");
const authToken = require("../auth/auth-token");

router.get("/", authToken.verifyToken, controller.show);
router.post("/order", authToken.verifyTokenAsUser, controller.createOrder);
router.get("/order/:id", authToken.verifyTokenAsMerchants, controller.showOrderById)

module.exports = router;
