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
        message: 'hello world'
    })
});

app.post('/new', (req, res) => {
    res.status(200);
    res.json({
        message: 'hello world'
    })
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});