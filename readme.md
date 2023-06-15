# 🔐 Authentication microservice

## 📝 Description

This microservice is responsible for authentication and authorization of users.

## 🔛 Endpoints

### POST /register (public)

to register a new user

#### Request

```json
{
  "email": "john.doe@gmail.com",
  "password": "password123!"
}
```

### POST /login (public)

to get a JWT token and user data

#### Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@gmail.com",
  "birthdate": "1990-01-01",
  "password": "password123!"
}
```

### GET /me (protected)

to get user data

## ⚙️ Installation

configure the environment variables in the .env file

```bash
$ yarn install
```

## Running the app

```bash
$ yarn start
```
