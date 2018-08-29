const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const models = require("../../../models/index");
const User = models.user;
const Merchant = models.merchant;
const Admin = models.admin;
const Logging = models.logging;

const controller = {
  login: async (req, res) => {}
};
