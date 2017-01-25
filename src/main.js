import { install } from 'source-map-support';
import mongoose from 'mongoose';
import App from './app';
import SessionRouter from './routers/session-router';
import SessionModel from './models/session-model';

// Sets up debugging via source maps
install();

// Make Mongoose use the ES6 Promise instead of mpromise
mongoose.Promise = global.Promise;
// Start up database -- replace this with environment vars to auth in prod
mongoose.connect("mongodb://localhost:27017/cap-w2");

const port = process.env.PORT || 3000;

let routes = {
    '/sessions': SessionRouter(SessionModel)
};

let server = new App(port, routes);
server.runServer();
