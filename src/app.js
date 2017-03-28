import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import session from 'cookie-session';
import passport from 'passport';
import HttpError from 'standard-http-error';
import { Strategy as LocalStrategy } from 'passport-local';
import { createErrorWrapperMessage } from './services/response-generator';

let _accountService;

// set the size limit for json objects to 1MB
// we should never actually need that much in practice
const JSON_SIZE_LIMIT = '10mb';

export default class {
    constructor(port, secret, accountService, sessionService, dev = false) {
        this._app = express();
        this._port = port;
        this._secret = secret;
        this._accountService = accountService;
        // the way passport works makes this hack necessary
        _accountService = accountService;
        this._sessionService = sessionService;

        this._setupMiddleware();
        this._setupRoutes();

        if (dev) {
            this._setupDevRoutes();
        }
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

        this._app.use(express.static(__dirname + '/public'));
        this._app.use(bodyParser.json({ limit: JSON_SIZE_LIMIT }));
        this._app.use(bodyParser.urlencoded({ extended: false, limit: JSON_SIZE_LIMIT }));

        // set up session handling
        this._app.use(session({ secret: this._secret }));

        this._app.use(passport.initialize());
        this._app.use(passport.session());

        // set up passportjs
        passport.use(new LocalStrategy({
            usernameField: 'email'
        }, this._localStrategy));
        passport.use('no-session', new LocalStrategy({
            usernameField: 'email',
            session: false
        }, this._localStrategy));
        passport.serializeUser(this._serializeUser);
        passport.deserializeUser(this._deserializeUser);
    }

    _serializeUser(user, done) {
        done(null, user._id);
    }

    _deserializeUser(id, done) {
        _accountService.getPhysicianProfileById(id)
            .then(val => {
                if (val.code == HttpError.OK) {
                    done(null, val.data._doc);
                } else {
                    done(val, false);
                }
            });
    }

    _localStrategy(email, password, done) {
        _accountService.getAccountByEmail(email)
            .exec((err, user) => {
                if (err) return done(err);
                if (!user) {
                    return done(null, false, { message: 'Invalid credentials.' });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Invalid credentials.' });
                }
                return done(null, user);
            });
    }

    _setupRoutes() {
        this._setupAccountRoutes();
        this._setupSessionRoutes();
    }

    _checkPhysician(req, res, next) {
        if (!(req.user)) {
            console.log('Check physician failed: no user logged in.');
            res.redirect(HttpError.UNAUTHORIZED, '/!#/login');
            return;
        }
        if (!_accountService.isPhysician(req.user)) {
            console.log('Check physician failed: user is not physician.');
            res.redirect(HttpError.UNAUTHORIZED, '/!#/login');
            return;
        }
        next();
    }

    _setupAccountRoutes() {
        this._app.post('/api/v1/register/patient', this._checkPhysician, (req, res) => {
            this._accountService.registerPatient(req.body, req.user._id)
                .then(out => {
                    res.status(out.code)
                        .json(out.data);
                })
        });

        this._app.post('/api/v1/register/physician', (req, res) => {
            this._accountService.registerPhysician(req.body)
                .then(out => {
                    // TODO: Need a more ergonomic way to weave this in
                    // checks for an OK error code and then tries to login
                    if (out.code == 200) {
                        req.login(out.data, err => {
                            if (err) {
                                console.log('Account created, but login error', err);
                                let newOut = createErrorWrapperMessage(
                                    'Failed to log in the new account.'
                                );
                                res.status(newOut.code)
                                    .json(newOut.data);
                            } else {
                                res.status(out.code)
                                    .json(out.data);
                            }
                        });
                    } else {
                        res.status(out.code)
                            .json(out.data);
                    }
                })
        });

        this._app.post(
            '/api/v1/login/physician',
            passport.authenticate('local'),
            this._checkPhysician,
            (req, res) => {
            this._accountService.getPhysicianProfileById(req.user._id)
                .then(out => {
                    res.status(out.code)
                        .json(out.data);
                })
        });

        this._app.get('/api/v1/loggedIn/physician', (req, res) => {
            if (!!(req.user) && _accountService.isPhysician(req.user)) {
                res.status(HttpError.OK).json(req.user);
            } else {
                res.status(HttpError.NOT_FOUND).json("0");
            }
        });

        this._app.post('/api/v1/logout', (req, res) => {
            req.logout();
            res.status(HttpError.OK)
                .send('');
        });

        this._app.get(
            '/api/v1/patient/:patientId',
            this._checkPhysician,
            (req, res) => {
                if (!req.user.patients.find(e => e._id == req.params.patientId)) {
                    console.log(`Physician ${req.user._id} is not authorized to access sessions for ${req.params.patientId}.`)
                    res.redirect(HttpError.UNAUTHORIZED, '/login');
                    return;
                }
                this._accountService.getPatientById(req.params.patientId)
                    .then(out => {
                        res.status(out.code)
                            .json(out.data);
                    });
            });
    }

    _checkPatient(req, res, next) {
        if (!(req.user)) {
            res.redirect(HttpError.UNAUTHORIZED, '/login');
            return;
        }
        if (!_accountService.isPatient(req.user)) {
            res.redirect(HttpError.UNAUTHORIZED, '/login');
            return;
        }
        next();
    }

    _setupSessionRoutes() {
        // this._app.get('/api/v1/sessions', (req, res) => {
        //     this._sessionService.getAllSessions()
        //         .then(out => {
        //             res.status(out.code)
        //                 .json(out.data);
        //         });
        // });

        // this._app.get(
        //     '/api/v1/sessions/:patientId',
        //     this._checkPhysician,
        //     (req, res) => {
        //         if (!req.user.patients.find(e => e._id == req.params.patientId)) {
        //             console.log(`Physician ${req.user._id} is not authorized to access sessions for ${req.params.patientId}.`)
        //             res.redirect(HttpError.UNAUTHORIZED, '/login');
        //             return;
        //         }
        //         this._sessionService.getSessionsByPatientId(req.params.patientId)
        //             .then(out => {
        //                 res.status(out.code)
        //                     .json(out.data);
        //             })
        // });

        this._app.get('/api/v1/sessions/:id', (req, res) => {
            let sessionId = req.params.id;
            this._sessionService.getSessionById(sessionId)
                .then(out => {
                    res.status(out.code)
                        .json(out.data);
                });
        });

        this._app.post(
            '/api/v1/sessions',
            passport.authenticate('no-session'),
            this._checkPatient,
            (req, res) => {
                let session = req.body;
                delete session.email;
                delete session.password;
                let userId = req.user._id;
                session.Patient = userId;
                this._sessionService.createSession(session)
                    .then(out => {
                        res.status(out.code)
                            .json(out.data);
                    })
        });

        // this._app.post('/api/v1/sessions/reserve',
        //     passport.authenticate('no-session'),
        //     this._checkPatient,
        //     (req, res) => {
        //         this._sessionService.createReservation(req.user._id)
        //             .then(out => {
        //                 res.status(out.code)
        //                     .json(out.data);
        //             });
        //     });
    }

    _setupDevRoutes() {
        this._app.get('/api/v1/dev', (req, res) => {
            res.status(200).send('Running in dev mode.');
        });
    }
}
