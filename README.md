# udemy-node-express-mongo

Node.js + Express REST API using MongoDB (via Mongoose) for a simple **users** and **places** backend. Includes **JWT authentication** (to protect create/update/delete place routes) and uses the **Google Geocoding API** to convert an address into coordinates when creating a place.<br />
This project was made based on the udemy course https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide <br />
When I was developing this project from scratch I had to deal with some errors because of mongoose version like: <br />
* require('mongoose-unique-validator')
* mongo await place.remove() not working
* MongoError: database name must be a string among other tiny mistakes

But as programmer is challenging when you find these errors and even I am new with mongoDB I solved it. Is a great course.

## Features

- **Users API**
  - List users (password excluded)
  - Signup + login returning a JWT
- **Places API**
  - Get a place by id
  - Get places for a user
  - Create/update/delete places (**protected with JWT**)
- **MongoDB**
  - Uses Mongoose models and transactions (session) for linking places ↔ users
- **Geocoding**
  - Uses Google Maps Geocoding API to turn `address` into `location` coords

## Tech stack

- Node.js, Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Validation (`express-validator`)
- Password hashing (`bcryptjs`)

## Requirements

- Node.js (LTS recommended)
- A MongoDB connection string (Atlas or local)
- A Google Maps Geocoding API key

## Installation

```bash
npm install
```

## Environment variables

This project reads environment variables via `dotenv` and expects a `.env` file in the project root.

Create a `.env` file with:

```bash
url="YOUR_MONGODB_CONNECTION_STRING"
API_KEY="YOUR_GOOGLE_GEOCODING_API_KEY"
```

Notes:
- The code currently expects the MongoDB URI under the key **`url`** (lowercase).
- The code currently expects the Google key under **`API_KEY`**.

## Running the server

The API listens on **port 5000**.

```bash
npm start
```

`npm start` runs `nodemon app.js`.

## API overview

Base URL:
- `http://localhost:5000`

### Users

- **GET** `/api/users`
  - Returns: `{ users: [...] }`

- **POST** `/api/users/signup`
  - Body JSON:
    - `name` (string)
    - `email` (string)
    - `password` (string)
  - Returns: `{ userId, email, token }`

- **POST** `/api/users/login`
  - Body JSON:
    - `email` (string)
    - `password` (string)
  - Returns: `{ userId, email, token }`

### Places

- **GET** `/api/places/:pid`
  - Returns: `{ place: ... }`

- **GET** `/api/places/user/:uid`
  - Returns: `{ places: [...] }`

Protected routes (require auth):
- **POST** `/api/places`
- **PATCH** `/api/places/:pid`
- **DELETE** `/api/places/:pid`

#### Authentication

Send the JWT in the `Authorization` header:

```http
Authorization: Bearer <token>
```

## Example requests

Signup:

```bash
curl -X POST http://localhost:5000/api/users/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"password\":\"password\"}"
```

Login:

```bash
curl -X POST http://localhost:5000/api/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password\"}"
```

Create a place (replace `<USER_ID>` and `<TOKEN>`):

```bash
curl -X POST http://localhost:5000/api/places ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer <TOKEN>" ^
  -d "{\"title\":\"My place\",\"description\":\"Nice spot\",\"address\":\"New York, NY\",\"creator\":\"<USER_ID>\"}"
```

## Common issues

- **401/403 on protected routes**: make sure you’re sending `Authorization: Bearer <token>` from login/signup.
- **Geocoding fails / ZERO_RESULTS**: verify your `API_KEY` and that the address is valid.
- **Mongo connection fails**: verify the `url` connection string and network access (Atlas IP allowlist, etc.).
