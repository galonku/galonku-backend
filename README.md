# Galonku Backend

[![Greenkeeper badge](https://badges.greenkeeper.io/andromedaorg/galonku-backend.svg)](https://greenkeeper.io/)
![Version 0.1.0](https://img.shields.io/badge/version-0.1.0-yellowgreen.svg)
![Content-API](https://img.shields.io/badge/content-API-green.svg)
![Section-Backend](https://img.shields.io/badge/section-backend-lightgrey.svg)

Backend section for Galonku Web application

## API Endpoint

_Note: Some URL/Endpoint is still under development_

| URL / Endpoints                  | Method | Description                       |
| -------------------------------- | ------ | --------------------------------- |
| /                                | GET    | Show API Menu                     |
| /admins                          | GET    | Show registered Admins            |
| /admins/login                    | POST   | Login as Admin account            |
| /admins/logout                   | GET    | Logout Admin account              |
| /admins/verifytoken              | GET    | Verify Admin token                |
| /merchants                       | GET    | Show registered Merchants         |
| /merchants/register              | POST   | Register Merchants                |
| /merchants/login/                | POST   | Login as Merchants                |
| /merchants/logout                | GET    | Logout Merchants                  |
| /merchants/verifytoken           | GET    | Verify Merchants token            |
| /merchants/search?q={store_name} | GET    | Search Merchants Store            |
| /merchants/edit-profile/id       | PUT    | Update profile Merchants          |
| /merchants/reviews>              | GET    | Show Merchants review             |
| /merchants/add-reviews           | POST   | Add Merchants review              |
| /users                           | GET    | Show registered Users             |
| /users/register                  | POST   | Register an Users account         |
| /users/login                     | POST   | Login as Users                    |
| /users/logout                    | GET    | Logout from Users                 |
| /users/verifytoken               | GET    | Verify Users Token                |
| /users/edit-profile/:id          | PUT    | Edit Users profile                |
| /users/delete-account/:id        | DELETE | Delete Users account              |
| /users/search?q={username}       | GET    | Search Users by username          |
| /orders/                         | GET    | Get orders for logged in merchant |
| /orders/order                    | POST   | Create order                      |
| /orders/order/:id                | GET    | Show datails order                |
| /orders/order/:id                | PUT    | Modify status order               |
| /feedback                        | GET    | Show Galonku Application feedback |

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

8. Table Feedback


    +--------------+-------------+--------+-------+-----------+----------------+
    | Field        | Type        | Null   | Key   |   Default | Extra          |
    |--------------+-------------+--------+-------+-----------+----------------|
    | id           | int(11)     | NO     | PRI   |    <null> | auto_increment |
    | name         | varchar(50) | NO     |       |    <null> |                |
    | email        | varchar(75) | NO     |       |    <null> |                |
    | phone_number | varchar(20) | YES    |       |    <null> |                |
    | comments     | text        | NO     |       |    <null> |                |
    | createdAt    | datetime    | NO     |       |    <null> |                |
    | updatedAt    | datetime    | NO     |       |    <null> |                |
    +--------------+-------------+--------+-------+-----------+----------------+