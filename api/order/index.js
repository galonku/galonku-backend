const express = require("express");
const router = express.Router();

const controller = require("./controller/index");

router.get("/", controller.show);
router.post("/order", controller.createOrder);

module.exports = router;
