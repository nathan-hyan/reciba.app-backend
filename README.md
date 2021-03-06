# REST API Template

This REST API template is configured to be used with TypeScript and ES6.

## Baked-in features

- TypeScript support
- ES6 support
- MongoDB support
- Built-in register / login system
- Works with create-react-app frontend app (Under a "frontend" folder)
- Morgan pre-installed (w/ tiny output)

## Working routes

**User register**
Route: `POST - /api/user/register`

Body: `{name: String; email: String; password: String}`

**User login**
Route: `POST - /api/user/login`

Body: `{email: String; password: String}`

## Installing the API

1.  Clone the repository
2.  `npm i`
3.  Create a `.env` file
4.  In the `.env` file, create the following entries:
    - `MONGO_URI=your_mongodb_uri_here`
    - `PORT=your_port_of_choice`
    - `TOKEN=your_jwt_token_secret`

## Installing the front-end app

1. Locate in the root folder of this app
2. Type `npx create-react-app frontend`
3. Open the `package.json` file of the frontend app
4. Add the line `"proxy": "http://localhost:8000"` after Scripts

## Running the app

You have two options available.

1.  Running the api individually with the command `npm run server`
2.  Running the app alongside a create-react-app application with Concurrently.

For this one is necesary to install the React application under a "frontend".

The `npm run dev` script will look for the frontend folder and execute the start script alongside the server script of the API.

## Goodies!

I've added a function called `createError(next, message, status?)` that allows you to trow
an error and be catched by the error handling capabilities of expressJs. Nothing too fancy but
better than a bunch of try...catch blocks tied together

## Questions? Bugs?

Find me at [exequiel@hyan.dev](mailto:exequiel@hyan.dev) or at my [LinkedIn Profile](https://www.linkedin.com/in/exequielm2048/)

Created by [Exequiel Mleziva](https://hyan.dev) - 2020
