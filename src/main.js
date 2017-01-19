import { install } from 'source-map-support';
import App from './app';

// Sets up debugging via source maps
install();

let server = new App();
server.runServer();
