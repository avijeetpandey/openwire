## Openwire :tada: :rocket:

A Backend API implementation of social media application with the ability to authenticate users and create posts with image and without images

### Things used for development

- `Typescript`
- `Express`
- `Cloudinary`
- `MongoDB`
- `Turbo mono repo`
- `Jest`
- `JWT`
- `SocketIO`
- `Redis`
- `Bull messaging queue`
- `Eslint` and `Prettier`
- `Bunyan logger`

## Steps to run the application

- `git clone the repo`
- `cd apps/server and yarn install` - this will install all the dependencies
- `create .env file and fill with data from .env.example`
- in the root folder `yarn dev` this will spin up the server on PORT `5175`

Before this make sure you have `REDIS` and `MONGODB` up and running

## Commands for the server

- `yarn build` - this will build the server from typescript to javascript
- `yarn test` - this will run all the tests for users and posts
- `yarn dev` - runs the server in development mode with nodemon watcher
- `yarn lint` - checks for linting errors
- `yarn lint:fix` - fix the lint errors
- `yarn redis:ui` - runs redis-commander ui so that all redis keys can be seen on UI
- `prettier:check` - checks for formatting issues
- `prettier:fix` - fixes the formatting issues

## Folder structure

The folder stucture of the application is standard, there is a folder corresponding to each feature and has the following things inside

- `controllers` - controllers for the endpoints
- `interfaces` - interfaces of the feature is defined here
- `models` - mongodb models are placed here for IO to mongodb
- `schemes` - validation for requests coming to backend via `Joi`
- `routes` - routes for the feature that are used inside the application for the particular feature

Apart from that `Shared` folder contains the frequently used or shared code that is being used by multiple features

- `globals`
  - `decorators` - contains decorators for request validation
  - `helpers` - container codes for middlerwares and other helper functions example custom errors etc
- `services`
  - `db` - contains implementation of calls to mongodb
  - `services` - contains the implementation of various services need by auth and post controllers
  - `email` - contains implementation of MailTransporter class
  - `queues` - contains code related to various queues (auth,user,post) etc
  - `redis` - contains implementation of redis cache implementation
- `workers` - contains code for workers that utilises and processed data in the queue

The Data of the queue is also accesible by `Bull Dashboard` on endpoint `localhost:5175/queues`

Made with ❤️ using Typescript
