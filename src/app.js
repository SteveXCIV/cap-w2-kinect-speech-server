import bodyParser from 'body-parser';
import express from 'express';
import expressPromise from 'express-promise';
import logger from 'morgan';

export default class {
    constructor(port, routes, apiVersion = '1') {
        this._app = express();
        this._port = port;
        this._apiPrefix = '/api/v' + String(apiVersion);
        this._routes = routes;

        this.setupMiddleware();
        this.setupRoutes();
    }

    get apiPrefix() {
        return this._apiPrefix;
    }

    runServer() {
        this._app.listen(this._port, () => {
            console.log(`Started the webserver on port ${this._port}.`);
        });
    }

    setupMiddleware() {
        // Set up logging
        this._app.use(logger('dev'));

        // Set up the middleware for JSON request/responses
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));

        // Now, extend it so promises are valid to return
        this._app.use(expressPromise());
    }

    setupRoutes() {
        for (let route of Object.keys(this._routes)) {
            let fullRoute = this.apiPrefix + route;
            let router = this._routes[route];
            console.log(`Setting up a router for the route: ${fullRoute}`);
            this._app.use(fullRoute, router);
        }
    }
}
