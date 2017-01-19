import { Router } from 'express';
import data from '../data';

export default function(sessionService) {
    let router = Router();

    router.get('/', (req, res) => {
        res.json(data);
    });

    router.get('/:id', (req, res) => {
        let match = data.find(x => x.id === parseInt(req.params.id));
        if (match) {
            res.json(match);
        } else {
            res.status(404)
                .send('Could not find session data.');
        }
    });

    router.post('/', (req, res) => {
        let next = getNextId(data);
        let item = req.body;
        item['id'] = next;
        data.push(item);
        res.json(item);
    });

    function getNextId(arr) {
        return arr.reduce((acc, x) => x.id >= acc ? 1 + x.id : acc, 0);
    }

    return router;
}
