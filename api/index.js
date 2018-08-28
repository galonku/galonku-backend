const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  const node_env = process.env.NODE_ENV;
  let host = "";
  if (node_env === "development") host = "localhost:3000";
  else host = "https://galonku.herokuapp.com";
  res.status(200).send({
    title: "Welcome to Galonku API",
    content: [
      {
        admins: {
          "show-admins": `${host}/admins`,
          register: `${host}/admins/register`,
          login: `${host}/admins/login`,
          logout: `${host}/admins/logout`,
          "delete-account": `${host}/admins/delete-account/:id`
        },
        merchants: {
          "show-merchants": `${host}/merchants`,
          register: `${host}/merchants/register`,
          login: `${host}/merchants/login`,
          logout: `${host}/merchants/logout`,
          "delete-account": `${host}/merchants/delete-account/:id`,
          "search-merchants": `${host}/merchants/search?q={store_name}`
        },
        users: {
          register: `${host}/users/register`,
          login: `${host}/users/login`,
          logout: `${host}/users/logout`,
          "delete-account": `${host}/users/delete-account/:id`,
          "search-users": `${host}/users/search?q={username}`
        }
      }
    ]
  });
});

module.exports = router;
