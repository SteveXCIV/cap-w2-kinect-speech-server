import { install } from 'source-map-support';
import App from './app';
import SessionRouter from './routers/session-router';
import SessionService from './services/session-service';

// Sets up debugging via source maps
install();

let sessionService = new SessionService();

let routes = {
    '/sessions': SessionRouter(sessionService)
};

let server = new App(routes);
server.runServer();
