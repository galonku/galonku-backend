# galonku-backend

[![Greenkeeper badge](https://badges.greenkeeper.io/andromedaorg/galonku-backend.svg)](https://greenkeeper.io/)
![Version 0.1.0](https://img.shields.io/badge/version-0.1.0-yellowgreen.svg)
![Content-API](https://img.shields.io/badge/content-API-green.svg)
![Section-Backend](https://img.shields.io/badge/section-backend-lightgrey.svg)

Backend section for Galonku Web application

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
