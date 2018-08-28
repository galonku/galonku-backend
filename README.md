# galonku-backend

[![Greenkeeper badge](https://badges.greenkeeper.io/andromedaorg/galonku-backend.svg)](https://greenkeeper.io/)
![Version 0.1.0](https://img.shields.io/badge/version-0.1.0-yellowgreen.svg)
![Content-API](https://img.shields.io/badge/content-API-green.svg)
![Section-Backend](https://img.shields.io/badge/section-backend-lightgrey.svg)

Backend section for Galonku Web application

## API Endpoint

1. Development

*Note: Some URL/Endpoint is still under development*

| URL / Endpoints   | Method | Description                  |
|-------------------|--------|------------------------------|
|localhost:port/    |   GET  | Show API Menu                |
|localhost:port/admins    |   GET |   Show registered Admins   |
|localhost:port/admins/login    |   POST    | Login as Admin account|
|localhost:port/admins/logout   |   GET | Logout Admin account|
|localhost:3000/merchants   | GET   |   Show registered Merchants|
|localhost:3000/merchants/register  |   POST    |   Register Merchants|
|localhost:3000/merchants/login/    |   POST    |   Login as Merchants|
|localhost:3000/merchants/logout    |   GET |   Logout Merchants|
|localhost:3000/merchants/delete-account/:id    |   DELETE  |   Delete Merchants account|
|localhost:3000/merchants/search?q={store_name}   |   GET   |   Search Merchants Store|
|localhost:3000/users/register  |   POST |   Register an Users account|
|localhost:3000/users/login |   POST    |   Login as Users|
|localhost:3000/users/logout    |   GET |   Logout from Users|
|localhost:3000/users/delete-account/:id    |   DELETE  |   Delete Users account|
|localhost:3000/users/search?q={username}   |   GET |   Search Users by username|
---

2. Production

| URL / Endpoints   | Method | Description                  |
|-------------------|--------|------------------------------|
|https://galonku.herokuapp.com/    |   GET  | Show API Menu                |
|https://galonku.herokuapp.com/admins    |   GET |   Show registered Admins   |
|https://galonku.herokuapp.com/admins/login    |   POST    | Login as Admin account|
|https://galonku.herokuapp.com/admins/logout   |   GET | Logout Admin account|
|https://galonku.herokuapp.com/merchants   | GET   |   Show registered Merchants|
|https://galonku.herokuapp.com/merchants/register  |   POST    |   Register Merchants|
|https://galonku.herokuapp.com/merchants/login/    |   POST    |   Login as Merchants|
|https://galonku.herokuapp.com/merchants/logout    |   GET |   Logout Merchants|
|https://galonku.herokuapp.com/merchants/delete-account/:id    |   DELETE  |   Delete Merchants account|
|https://galonku.herokuapp.com/merchants/search?q={store_name}   |   GET   |   Search Merchants Store|
|https://galonku.herokuapp.com/users/register  |   POST |   Register an Users account|
|https://galonku.herokuapp.com/users/login |   POST    |   Login as Users|
|https://galonku.herokuapp.com/users/logout    |   GET |   Logout from Users|
|https://galonku.herokuapp.com/users/delete-account/:id    |   DELETE  |   Delete Users account|
|https://galonku.herokuapp.com/users/search?q={username}   |   GET |   Search Users by username|

## Database Design

1. Table merchant

```
+-----------------+--------------+--------+-------+-----------+----------------+
| Field           | Type         | Null   | Key   |   Default | Extra          |
|-----------------+--------------+--------+-------+-----------+----------------|
| id              | int(11)      | NO     | PRI   |    <null> | auto_increment |
| username        | varchar(40)  | YES    |       |    <null> |                |
| store_name      | varchar(100) | YES    |       |    <null> |                |
| email           | varchar(100) | YES    |       |    <null> |                |
| password        | varchar(50)  | YES    |       |    <null> |                |
| phone_number    | varchar(30)  | YES    |       |    <null> |                |
| identity_number | varchar(20)  | YES    |       |    <null> |                |
| address         | text         | YES    |       |    <null> |                |
| createdAt       | varchar(255) | NO     |       |    <null> |                |
| updatedAt       | varchar(255) | NO     |       |    <null> |                |
+-----------------+--------------+--------+-------+-----------+----------------+
```

---

2. Table Admin

```
+-----------+--------------+--------+-------+-----------+----------------+
| Field     | Type         | Null   | Key   |   Default | Extra          |
|-----------+--------------+--------+-------+-----------+----------------|
| id        | int(11)      | NO     | PRI   |    <null> | auto_increment |
| username  | varchar(30)  | NO     |       |    <null> |                |
| email     | varchar(50)  | NO     |       |    <null> |                |
| password  | varchar(50)  | NO     |       |    <null> |                |
| fullname  | varchar(75)  | NO     |       |    <null> |                |
| createdAt | varchar(255) | NO     |       |    <null> |                |
| updatedAt | varchar(255) | NO     |       |    <null> |                |
+-----------+--------------+--------+-------+-----------+----------------+

```
