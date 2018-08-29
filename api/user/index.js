const express = require("express");
const router = express.Router();

const controller = require("./controller/index");
const authToken = require("../auth/auth-token");

router.get("/verifytoken", authToken.verifyToken, authToken.valid);

router.get("/", authToken.verifyToken, controller.show);
router.get("/search", controller.searchUser);
router.get("/logout", controller.logout);
router.put(
  "/edit-profile/:id",
  authToken.verifyToken,
  controller.updateProfile
);
router.post("/login", authToken.verifyLogin, controller.login);
router.post("/register", controller.register);
router.delete(
  "/delete-account/:id",
  authToken.verifyToken,
  controller.deleteAccount
);

module.exports = router;
