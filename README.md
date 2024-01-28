## Questions

- Is a separate nginx container needed?
  - Possibly, for CORs, Websocket 
    - if not using localhost, or if wanting to use https in development
  - if the application serve from backend and frontend to the public the web service needs to be a more complicated one setting up redirect rules etc
    - In such situation, its better to keep the application serving logic closer to the ops configuration
    - however this is a perception thing, if we are not scaling services up & down using docker swarm, where the configuration lies does not make that much difference
- Is project wide scripts to start, build and ship needed? We did this with one project where it was getting complicated.

## Issues

- nginx service seems redundant.
- there is no dev build
- express be might need to restrict cors setup from react container only
  - but unless it is exposed to the public it might not be necessary
- add websocket for two way communication
- add axios
- add full crud for user
- on react-fe directly navigating to /users results in not found 

## Project

- Services, Images, naming etc are like that because it is thought from a microservices architecture.
  - i.e you can have more than express backend, main one is called `express-be-main`
- Base images are built as a separate service so they can be built as needed and then passed as a source for other services. e.g. node image is some of the central image that is used in majority, if we want to build that image in 
- Services are profiled as images, backend, frontend in order to separate the images services can be left out after the first build.
- The username and password for mongodb is statically defined in docker-compose/mongodb/data/1.init.js 


Build the project

COMPOSE_PROFILES=images,backend,frontend docker compose build

## Express BE - Main

```
cd docker-compose
docker compose exec express-be-main express
```


You can run the application generator with the npx command (available in Node.js 8.2.0).

$ npx express-generator


For example, the following creates an Express app named myapp. The app will be created in a folder named myapp in the current working directory and the view engine will be set to Pug:

$ express --view=pug myapp

## React FE - Main

Build

```
cd docker-compose
docker compose exec react-fe-main npm run build
```

Test

docker compose exec react-fe-main npm run test

## React

npx create-react-app my-app
npm init react-app my-app
yarn create react-app my-app

### Templates

You can find a list of available templates by searching for ["cra-template-*"](https://www.npmjs.com/search?q=cra-template-*) on npm.

### React with TypeScript

npx create-react-app my-app --template typescript

npx create-react-app my-app --template cra-template-pwa-typescript
