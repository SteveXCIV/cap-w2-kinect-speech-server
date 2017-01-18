import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import sessionRouter from './routes/session_routes';
import { install } from 'source-map-support';

// Sets up debugging via source maps
install();

// Create the express application
const app = express();

// Set up logging
app.use(logger('dev'));

// Set up the middleware for JSON request/responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Send all /api/v1/sessions through the session router
app.use('/api/v1/sessions', sessionRouter);

// Start up the server on the configured port, or 3000
const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Started the webserver.');
});

export default server;
