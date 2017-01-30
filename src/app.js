import bodyParser from 'body-parser';
import express from 'express';
import expressPromise from 'express-promise';
import logger from 'morgan';

export default class {
    constructor(port, sessionService) {
        this._app = express();
        this._port = port;
        this._sessionService = sessionService;

        this._setupMiddleware();
        this._setupRoutes();
    }

    get apiPrefix() {
        return this._apiPrefix;
    }

    runServer() {
        this._app.listen(this._port, () => {
            console.log(`Started the webserver on port ${this._port}.`);
        });
    }

    _setupMiddleware() {
        // Set up logging
        this._app.use(logger('dev'));

        // Set up the middleware for JSON request/responses
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));

        // Now, extend it so promises are valid to return
        this._app.use(expressPromise());
    }

    _setupRoutes() {
        this._setupSessionRoutes();
    }

    _setupSessionRoutes() {
        this._app.get('/api/v1/sessions', (req, res) => {
            res.json(this._sessionService.getAllSessions());
        });

        this._app.get('/api/v1/sessions/:id', (req, res) => {
            let sessionId = req.params.id;
            res.json(this._sessionService.getSessionById(sessionId));
        });

        this._app.post('/api/v1/sessions', (req, res) => {
            let session = req.body;
            res.json(this._sessionService.createSession(session));
        });
    }
}
