import { install } from 'source-map-support';
import App from './app';
import SessionRouter from './routers/session-router';

// Sets up debugging via source maps
install();

let routes = {
    '/sessions': SessionRouter()
};

let server = new App(routes);
server.runServer();
