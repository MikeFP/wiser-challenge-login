# Wiser Challenge

This is a project that uses Next.js to serve a React Login Page, featuring:

- Responsive design
- Form validation
- User state management simulation
- Communication with simulated back-end API

## Running in development mode

To make changes or work in a local environment, first clone this repository and install dependencies. Then, run `npm run dev`:

    git clone https://github.com/MikeFP/wiser-challenge-login.git
    npm install
    npm run dev

## Deploying for production

To run this project in a production server, build and run the site with the following commands:

    npm install
    npm run build
    npm start

Note: If you are already running a webserver on port 80 (e.g. Macs usually have the Apache webserver running on port 80) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. `PORT=3000 npm start`).

## Feature notes

For mock purposes, each login attempt alternates between success and error responses.
