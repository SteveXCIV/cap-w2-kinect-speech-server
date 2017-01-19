import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';

export default class {
    constructor(routes, apiVersion = '1') {
        this.app = express();
        this.apiPrefix = '/api/v' + String(apiVersion);
        this.routes = routes;

        this.setupMiddleware();
        this.setupRoutes();
    }

    runServer() {
        this.app.listen(process.env.PORT || 3000, () => {
            console.log('Started the webserver.');
        });
    }

    setupMiddleware() {
        // Set up logging
        this.app.use(logger('dev'));

        // Set up the middleware for JSON request/responses
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    setupRoutes() {
        for (let route of Object.keys(this.routes)) {
            let fullRoute = this.apiPrefix + route;
            let router = this.routes[route];
            console.log(`Setting up a router for the route: ${fullRoute}`);
            this.app.use(fullRoute, router);
        }
    }
}
