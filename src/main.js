import { install } from 'source-map-support';
import mongoose from 'mongoose';
import App from './app';
import AccountService from './services/account-service';
import { Patient, Physician, Account } from './models/account-model';
import SessionService from './services/session-service';
import SessionModel from './models/session-model';

// Sets up debugging via source maps
install();

// Make Mongoose use the ES6 Promise instead of mpromise
mongoose.Promise = global.Promise;
// Start up database -- replace this with environment vars to auth in prod
mongoose.connect("mongodb://localhost:27017/cap-w2");

const port = process.env.PORT || 3000;
const dev = process.env.DEV || false;
const secret = process.env.SECRET || 'cap-w2';

let accountService = new AccountService(Patient, Physician, Account);
let sessionService = new SessionService(SessionModel);

let server = new App(port, secret, accountService, sessionService, dev);
server.runServer();
