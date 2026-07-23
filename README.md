# devTinder Backend

This project is a backend service for a developer-focused matchmaking app built with Node.js and Express. It supports user authentication, profile management, and connection request handling between users.

## Features

- User signup, login, and logout
- JWT-based authentication with secure cookies
- Profile viewing and profile updates
- Send connection requests with statuses like interested or ignored
- Review incoming requests as accepted or rejected
- View pending requests, accepted connections, and a personalized feed

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- cookie-parser and cors
- dotenv for environment configuration

## Project Structure

- src/app.js - Main Express server entry point
- src/config/database.js - MongoDB connection setup
- src/models/ - Mongoose schemas for users and requests
- src/routers/ - API routes for auth, profile, requests, and users
- src/middlewares/ - Authentication middleware
- src/helpers/ - Validation and data normalization helpers

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=2002
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- npm run dev - Start the server with nodemon
- npm start - Start the server in production mode

## API Overview

### Auth

- POST /signup
- POST /login
- DELETE /logout

### Profile

- GET /profile
- PATCH /profile/edit

### Connections

- POST /sendConnectionReq/:status/:receiverId
- POST /request/review/:status/:requestId
- GET /viewPendingRequest
- GET /connection
- GET /feed

## Notes

- The app uses cookies for authentication, so the frontend should allow credentials in requests.
- Make sure your MongoDB database is running before starting the server.
- The default server port is 2002.
