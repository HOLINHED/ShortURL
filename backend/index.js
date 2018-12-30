'use strict'

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const validUrl = require('valid-url');

const PORT = 3000;
const app = express();

app.enable('trust-proxy');
app.use(express.json());
app.use(cors());

app.get('/:id', (req, res) => {
    res.status(200);
    res.json({
        id: req.params.id,
        message: 200
    });
});

app.use(rateLimit({
    windowMs: 5 * 1000,
    max: 1
}));

app.post('/new', (req, res) => {

    const LONG_URL = req.body.link.toString().trim();

    if (validUrl.isWebUri(LONG_URL)){
        res.json({
            longURL: LONG_URL,
            id: 0
        });
    } else {
        res.status(422);
        res.json({
            status: 'error'
        });
    }
});

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
        message: error.message
    });
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});