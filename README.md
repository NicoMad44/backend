# Backend – Books API
This backend is a Node/Express API using MongoDB, JWT authentication, and file uploads, intended to power a books application with user accounts.
​

## Prerequisites
Node.js 20.x installed on your machine.

+ A running MongoDB instance (local or MongoDB Atlas) and a valid connection URI.

+ npm (comes with Node.js) to install project dependencies.

## Installation
Clone the repository:
git clone https://github.com/NicoMad44/backend.git

Move into the project folder:
cd backend

## Install dependencies:
npm install

Make sure the images directory exists and is writable for file uploads.
​

## Configuration
Update the MongoDB connection string in app.js with your own credentials and database name.

Ensure CORS configuration (allowedOrigins array in app.js) matches your frontend URL (for example https://nicomad44.github.io).

Set a secure JWT secret and other sensitive values using environment variables (for example via a .env file) and load them in your configuration code.

## Available Scripts
npm start
Starts the HTTP server using the entry point defined in package.json (currently index.js).

npm test
Placeholder script that exits with an error message until real tests are implemented.

## Tech Stack
+ Runtime: Node.js 20.x.

+ Framework: Express 5.

+ Database: MongoDB via Mongoose (with mongoose-unique-validator).

+ Auth & Security: JSON Web Token (jsonwebtoken), password hashing with bcrypt.

+ Validation & Uploads: express-validator for request validation, multer for handling file uploads (book images stored under /images).
​

## API Structure
Main application setup in app.js, exporting the configured Express app.

### Routes:

+ /api/books handled by routes/book and related controllers for book resources.
​

+ /api/auth handled by routes/user for user registration and login.
​

+ Static files (images) served from /images using Express static middleware.
​
