import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import sessionRouter from './routes/session_routes';

export default class {
    constructor() {
        this.app = express();

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
        // Send all /api/v1/sessions through the session router
        this.app.use('/api/v1/sessions', sessionRouter);
    }
}
