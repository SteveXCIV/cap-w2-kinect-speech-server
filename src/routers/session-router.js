import { Router } from 'express';

export default function(sessionModel) {
    let router = Router();

    router.get('/', (req, res) => {
        res.json(sessionModel.find());
    });

    router.get('/:id', (req, res) => {
        let sessionId = req.params.id;
        res.json(sessionModel.findById(sessionId));
    });

    router.post('/', (req, res) => {
        let data = req.body;
        res.json(sessionModel.create(data));
    });

    return router;
}
