# galonku-backend

[![Greenkeeper badge](https://badges.greenkeeper.io/andromedaorg/galonku-backend.svg)](https://greenkeeper.io/)
![Version 0.1.0](https://img.shields.io/badge/version-0.1.0-yellowgreen.svg)
![Content-API](https://img.shields.io/badge/content-API-green.svg)
![Section-Backend](https://img.shields.io/badge/section-backend-lightgrey.svg)

Backend section for Galonku Web application

## API Endpoint

_Note: Some URL/Endpoint is still under development_

| URL / Endpoints                                                 | Method | Description               |
| --------------------------------------------------------------- | ------ | ------------------------- |
| <https://galonku.herokuapp.com/>                                | GET    | Show API Menu             |
| <https://galonku.herokuapp.com/admins>                          | GET    | Show registered Admins    |
| <https://galonku.herokuapp.com/admins/login>                    | POST   | Login as Admin account    |
| <https://galonku.herokuapp.com/admins/logout>                   | GET    | Logout Admin account      |
| <https://galonku.herokuapp.com/admins/verifytoken>              | GET    | Verify Admin token        |
| <https://galonku.herokuapp.com/merchants>                       | GET    | Show registered Merchants |
| <https://galonku.herokuapp.com/merchants/register>              | POST   | Register Merchants        |
| <https://galonku.herokuapp.com/merchants/login/>                | POST   | Login as Merchants        |
| <https://galonku.herokuapp.com/merchants/logout>                | GET    | Logout Merchants          |
| <https://galonku.herokuapp.com/merchants/verifytoken>           | GET    | Verify Merchants token    |
| <https://galonku.herokuapp.com/merchants/search?q={store_name}> | GET    | Search Merchants Store    |
| <https://galonku.herokuapp.com/merchants/edit-profile/id>       | PUT    | Update profile Merchants  |
| <https://galonku.herokuapp.com/merchants/reviews>               | GET    | Show Merchants review     |
| <https://galonku.herokuapp.com/merchants/add-reviews>           | POST   | Add Merchants review      |
| <https://galonku.herokuapp.com/users>                           | GET    | Show registered Users     |
| <https://galonku.herokuapp.com/users/register>                  | POST   | Register an Users account |
| <https://galonku.herokuapp.com/users/login>                     | POST   | Login as Users            |
| <https://galonku.herokuapp.com/users/logout>                    | GET    | Logout from Users         |
| <https://galonku.herokuapp.com/users/verifytoken>               | GET    | Verify Users Token        |
| <https://galonku.herokuapp.com/users/edit-profile/:id>          | PUT    | Edit Users profile        |
| <https://galonku.herokuapp.com/users/delete-account/:id>        | DELETE | Delete Users account      |
| <https://galonku.herokuapp.com/users/search?q={username}>       | GET    | Search Users by username  |
| <https://galonku.herokuapp.com/orders/>                         | GET    | Get orders                |
| <https://galonku.herokuapp.com/orders/order>                    | POST   | Create order              |

## Database Design

1.  Table Admin


        +-----------+--------------+--------+-------+-----------+----------------+
        | Field     | Type         | Null   | Key   |   Default | Extra          |
        |-----------+--------------+--------+-------+-----------+----------------|
        | id        | int(11)      | NO     | PRI   |    <null> | auto_increment |
        | username  | varchar(30)  | NO     |       |    <null> |                |
        | email     | varchar(50)  | NO     |       |    <null> |                |
        | password  | varchar(255) | NO     |       |    <null> |                |
        | fullname  | varchar(75)  | NO     |       |    <null> |                |
        | createdAt | varchar(255) | NO     |       |    <null> |                |
        | updatedAt | varchar(255) | NO     |       |    <null> |                |
        +-----------+--------------+--------+-------+-----------+----------------+

2.  Table Merchant


        +-----------------+----------------------------+--------+-------+-----------+----------------+
        | Field           | Type                       | Null   | Key   | Default   | Extra          |
        |-----------------+----------------------------+--------+-------+-----------+----------------|
        | id              | int(11)                    | NO     | PRI   | <null>    | auto_increment |
        | username        | varchar(40)                | NO     | UNI   | <null>    |                |
        | store_name      | varchar(100)               | NO     | UNI   | <null>    |                |
        | email           | varchar(100)               | NO     | UNI   | <null>    |                |
        | password        | varchar(255)               | NO     |       | <null>    |                |
        | phone_number    | varchar(30)                | NO     |       | <null>    |                |
        | identity_number | varchar(20)                | NO     | UNI   | <null>    |                |
        | price           | int(11)                    | NO     |       | <null>    |                |
        | address         | text                       | NO     |       | <null>    |                |
        | status          | enum('pending','verified') | NO     |       | pending   |                |
        | createdAt       | varchar(255)               | NO     |       | <null>    |                |
        | updatedAt       | varchar(255)               | NO     |       | <null>    |                |
        +-----------------+----------------------------+--------+-------+-----------+----------------+

3.  Table User


        +--------------+--------------+------+-----+---------+----------------+
        | Field        | Type         | Null | Key | Default | Extra          |
        +--------------+--------------+------+-----+---------+----------------+
        | id           | int(11)      | NO   | PRI | NULL    | auto_increment |
        | username     | varchar(40)  | NO   |     | NULL    |                |
        | email        | varchar(100) | NO   |     | NULL    |                |
        | password     | varchar(255) | NO   |     | NULL    |                |
        | fullname     | varchar(75)  | NO   |     | NULL    |                |
        | phone_number | varchar(30)  | NO   |     | NULL    |                |
        | address      | text         | NO   |     | NULL    |                |
        | createdAt    | varchar(255) | NO   |     | NULL    |                |
        | updatedAt    | varchar(255) | NO   |     | NULL    |                |
        +--------------+--------------+------+-----+---------+----------------+

4.  Table Order


        +--------------+----------------------------------+--------+-------+-----------+----------------+
        | Field        | Type                             | Null   | Key   | Default   | Extra          |
        |--------------+----------------------------------+--------+-------+-----------+----------------|
        | id           | int(11)                          | NO     | PRI   | <null>    | auto_increment |
        | iduser       | int(11)                          | NO     |       | <null>    |                |
        | merchant     | varchar(100)                     | NO     |       | <null>    |                |
        | quantity     | int(11)                          | NO     |       | <null>    |                |
        | phone_number | varchar(30)                      | NO     |       | <null>    |                |
        | user_address | text                             | NO     |       | <null>    |                |
        | user_notes   | text                             | NO     |       | <null>    |                |
        | status       | enum('pending','process','done') | NO     |       | pending   |                |
        | createdAt    | varchar(255)                     | NO     |       | <null>    |                |
        | updatedAt    | varchar(255)                     | NO     |       | <null>    |                |
        +--------------+----------------------------------+--------+-------+-----------+----------------+

5.  Table Logging


        +-----------+---------------------------------+--------+-------+-----------+----------------+
        | Field     | Type                            | Null   | Key   |   Default | Extra          |
        |-----------+---------------------------------+--------+-------+-----------+----------------|
        | id        | int(11)                         | NO     | PRI   |    <null> | auto_increment |
        | iduser    | int(11)                         | NO     |       |    <null> |                |
        | username  | varchar(255)                    | NO     |       |    <null> |                |
        | role      | enum('user','merchant','admin') | NO     |       |    <null> |                |
        | token     | varchar(255)                    | NO     |       |    <null> |                |
        | createdAt | datetime                        | NO     |       |    <null> |                |
        | updatedAt | datetime                        | NO     |       |    <null> |                |
        +-----------+---------------------------------+--------+-------+-----------+----------------+

6.  Table Reviews


        +------------+-------------+--------+-------+-----------+----------------+
        | Field      | Type        | Null   | Key   |   Default | Extra          |
        |------------+-------------+--------+-------+-----------+----------------|
        | id         | int(11)     | NO     | PRI   |    <null> | auto_increment |
        | comments   | text        | YES    |       |    <null> |                |
        | store_name | varchar(80) | YES    |       |    <null> |                |
        | username   | varchar(40) | YES    |       |    <null> |                |
        | createdAt  | datetime    | NO     |       |    <null> |                |
        | updatedAt  | datetime    | NO     |       |    <null> |                |
        +------------+-------------+--------+-------+-----------+----------------+

7.  View Orders


        +--------------+----------------------------------+--------+-------+-----------+---------+
        | Field        | Type                             | Null   | Key   | Default   | Extra   |
        |--------------+----------------------------------+--------+-------+-----------+---------|
        | fullname     | varchar(75)                      | YES    |       | <null>    |         |
        | address      | text                             | YES    |       | <null>    |         |
        | phone number | varchar(30)                      | YES    |       | <null>    |         |
        | notes        | text                             | YES    |       | <null>    |         |
        | store_name   | varchar(100)                     | YES    |       | <null>    |         |
        | price        | int(11)                          | YES    |       | <null>    |         |
        | quantity     | int(11)                          | YES    |       | <null>    |         |
        | Total        | bigint(21)                       | YES    |       | <null>    |         |
        | status       | enum('pending','process','done') | YES    |       | pending   |         |
        +--------------+----------------------------------+--------+-------+-----------+---------+
