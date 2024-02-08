## Backend

### Run app
- Ensure a postgresql database is running with configuration matching our [.env file](./.env)
    - Run any new scripts in the /db folder
- Install node modules with `npm install`
- Start app with `npm start`
- Interact with routes defined in [init-routes.js](./src/init-routes.js) by making a GET request to [localhost:3002/health](localhost:3002/health)
- To run integration tests run `npm run test:integration`
- To run integration tests run `npm run test:unit`


