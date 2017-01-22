import { Router } from 'express';

export default function(sessionService) {
    let router = Router();

    router.get('/', (req, res) => {
        res.json(sessionService.getAllSessions());
    });

    router.get('/:id', (req, res) => {
        let sessionId = parseInt(req.params.id);
        res.json(sessionService.getSessionById(sessionId));
    });

    router.post('/', (req, res) => {
        let data = req.body;
        res.json(sessionService.createSession(data));
    });

    return router;
}
