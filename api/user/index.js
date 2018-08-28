const express = require("express");
const router = express.Router();

const controller = require("./controller/index");

router.get("/", controller.show);
router.get("/search", controller.searchUser);
router.get("/logout", controller.logout);
router.put("/:id", controller.updateProfile);
router.post("/login", controller.login);
router.post("/register", controller.register);
router.delete("/delete-account/:id", controller.deleteAccount);

module.exports = router;
