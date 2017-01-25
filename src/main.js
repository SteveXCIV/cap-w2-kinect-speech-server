import { install } from 'source-map-support';
import mongoose from 'mongoose';
import App from './app';
import SessionRouter from './routers/session-router';
import SessionService from './services/session-service';

// Sets up debugging via source maps
install();

// Start up database -- replace this with environment vars to auth in prod
mongoose.connect("mongodb://localhost:27017/cap-w2");

let sessionService = new SessionService();

let routes = {
    '/sessions': SessionRouter(sessionService)
};

let server = new App(routes);
server.runServer();
