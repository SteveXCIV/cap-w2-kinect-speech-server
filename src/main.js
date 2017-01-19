import { install } from 'source-map-support';
import App from './app';
import sessionRouter from './routes/session_routes';

// Sets up debugging via source maps
install();

let routes = {
    '/sessions': sessionRouter
};

let server = new App(routes);
server.runServer();
