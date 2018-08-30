const express = require("express");
const router = express.Router();

const controller = require("./controller/index");
const authToken = require("../auth/auth-token");

router.get("/verifytoken", authToken.verifyTokenAsUser, authToken.valid);

router.get("/", authToken.verifyTokenAsUser, controller.show);
router.get("/search", controller.searchUser);
router.get("/logout", controller.logout);
router.put(
  "/edit-profile/:id",
  authToken.verifyTokenAsUser,
  controller.updateProfile
);
router.post("/login", authToken.verifyLogin, controller.login);
router.post("/register", controller.register);
router.delete(
  "/delete-account/:id",
  authToken.verifyTokenAsUser,
  controller.deleteAccount
);

module.exports = router;
