const express = require("express");
const router = express.Router();

const controller = require("./controller/index");
const authToken = require("../auth/auth-token");

router.get("/", authToken.verifyToken, controller.show);
router.get("/order/:id", authToken.verifyToken, controller.showOrderById);
router.post("/order", authToken.verifyTokenAsUser, controller.createOrder);
router.put(
  "/order/:id",
  authToken.verifyToken,
  controller.updateOrderStatus
);
module.exports = router;
