import { Router, Request, Response, NextFunction } from 'express';
const Database = require('../data');

export class SessionRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(Database);
    }

    init() {
        this.router.get('/', this.getAll);
    }
}

const sessionRoutes = new SessionRouter();
sessionRoutes.init();

export default sessionRoutes.router;
