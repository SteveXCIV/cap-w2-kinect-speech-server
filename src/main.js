import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Started the webserver.');
});
