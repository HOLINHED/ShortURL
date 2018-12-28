'use strict'

const express = require('express');
const cors = require('cors');
const check = require('./modules/check');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/:id', (req, res) => {
    res.status(200);
    res.json({
        id: req.params.id,
        message: 200
    });
});

app.post('/new', (req, res) => {
    res.status(200);
    const id = 0;
    res.json({
        longURL: req.body.link,
        id
    });
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});