import * as http from 'http';
import * as debug from 'debug';

import App from './App';

debug('kinect-speech-server');

const port = normalizePort(process.env.PORT || 8000);
App.set('port', port);

const server = http.createServer(App);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

function normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            console.error(`Permission denied. ${bind} is not accessible.`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Permission denied. ${bind} is already in use.`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr}`;
    debug(`Listening on ${bind}.`)
}
