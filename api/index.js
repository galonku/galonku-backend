const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
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
          "login": `${host}/admins/login`,
          "logout": `${host}/admins/logout`,
          "verify-token": "${host}/admins/verifytoken",
          "delete-account": `${host}/admins/delete-account/:id`
        },
        merchants: {
          "show-merchants": `${host}/merchants`,
          "register": `${host}/merchants/register`,
          "login": `${host}/merchants/login`,
          "logout": `${host}/merchants/logout`,
          "verify-token": `${host}/merchants/verifytoken`,
          "search-merchants": `${host}/merchants/search?q={store_name}`,
          "edit-profile": `${host}/merchants/edit-profile/:id`,
          "show-reviews": `${host}/merchants/reviews`
        },
        users: {
          "register": `${host}/users/register`,
          "login": `${host}/users/login`,
          "logout": `${host}/users/logout`,
          "verify-token": `${host}/users/verifytoken`,
          "edit-profile": `${host}/users/edit-profile/:id`,
          "delete-account": `${host}/users/delete-account/:id`,
          "search-users": `${host}/users/search?q={username}`,
          "add-reviews": `${host}/merchants/add-reviews`
        },
        orders: {
          "show-oders": `${host}/orders`,
          "order": `${host}/orders/order`,
          "show-details-order":`${host}/orders/order/:id`,
          "modify-status-order":`${host}/orders/order/:id`,
          "show-feedback":`${host}/feedback`,
          "send-feedback":`${host}/feedback/send`
        }
      }
    ]
  });
});

module.exports = router;
