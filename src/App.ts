import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

// Class to contain an ExpressJS webserver
class App {
    // Make express available to consumers
    public express: express.Application;

    // Run the config methods
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure the middleware
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure routes
    private routes(): void {
        let router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Everything looks good here.'
            });
        });

        this.express.use('/', router);
    }
}

export default new App().express;
