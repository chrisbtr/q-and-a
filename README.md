# Q&A App
## Project Description
This application runs on IOS, Android, and Desktop Web Browsers. It is a message board where users can post questions. The questions can then be answered by another user who has the correct permissions to do so.     

## Purpose
This project is intended to demonstrate my abilities with certain technologies and is **NOT** intended to be used in production.

## Technologies Used
### Client (frontend)
- TypeScript
- React Native (using Expo)
- React Native Paper
- React Navigation
  - Used to navigate the pages of the app.
- Redux Toolkit
  - Used to keep track of global state.
- Axios
  - Used to call backend apis.
### Server (backend)
- TypeScript
- Prisma 3 (with PostgreSQL)
  - Used as ORM for PostgreSQL.
- Express
  - Used to create RESTful APIs.
- express-validator
  - Used to validate requests being sent to the express. 
- bcrypt
  - Used to create encrypted web tokens (for logging-in users).
- jsonwebtoken
  - Used sign web tokens (for logging in users).

## Requirements
- Node.js (I'm using v20.5.0)
- Yarn (I'm using 1.22.19)
- Expo (I'm using 49.0.0)
- PostgreSQL

## Setup
**NOTE:** The below setup Instructions assumes you have cloned this repo and at each step, you are in the root directory of the repo. 
### Client
#### Step 0 - Install Client Dependencies:
- cd into the `client` directory
- Run `yarn install`

#### Step 1 - Creating `entryPoint.tsx`:  
- Copy `client/api/entryPoint.sample.tsx` to `client/api/entryPoint.tsx`
  - In `client/api/entryPoint.tsx` update `<your IP address>` with the IP address or hostname the `server` running on.

### Server
#### Step 0 - Install Server Dependencies:
- cd into the `server` directory
- Run `yarn install`

#### Step 1 - Creating `seed.ts`:  
- Copy `server/prisma/seed.sample.ts` to `server/prisma/seed.ts`
  - `seed.ts` is used to populate the database with initial values. 
  - You are free to modify this file as you see fit.

#### Step 2 - Creating `.env`:
- Copy `server/.env.sample` to `server/.env`
  - Replace the value of `SECRET_KEY` with a secret key for encrypting web tokens.
  - Replace the value of `DATABASE_URL` with the connection string for your PostgreSQL DB that will be used by `Prisma`.
  
#### Step 3 - Generating Prisma Client:
- cd to the `server/prisma` directory
- Run `prisma generate` to generate the Prisma Client based on the `server/prisma/schema.prisma` file. 

#### Step 4 - Initializing the DB using `seed.ts`:
- cd to the `server` directory
- run `yarn seed`
