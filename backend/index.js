'use strict'

const express = require('express');
const cors = require('cors');
const monk = require('monk');
const rateLimit = require('express-rate-limit');
const validUrl = require('valid-url');

const PORT = process.env.PORT || 3000;
const app = express();
const db = monk(process.env.MONGO_URI || 'localhost/ShortURL');
const urls = db.get('urls');

app.enable('trust-proxy');
app.use(express.json());
app.use(cors());

app.get('/u/:id', (req, res, next) => {

    const disc = parseInt(req.params.id) || 0;

    urls
    .find({discriminator: disc})
    .then(data => {
        if (data.length > 0){
            
            res.writeHead(302, {
                'Location': data[0].link
            });
            
            res.end();

        } else {
            res.status(200).json({
                message: 'invalid URL'
            });
        }

    })
    .catch(next);
});

app.use(rateLimit({
    windowMs: 5 * 1000,
    max: 1
}));

app.post('/new', (req, res, next) => {

    const LONG_URL = req.body.link.toString().trim();

    if (validUrl.isWebUri(LONG_URL)){

        urls
        .find({link: LONG_URL})
        .then(data => {
            if (data.length > 0) {
                res.status(200).json(data[0]);
            } else {

                urls.find({}, { sort: { $natural : -1}, limit : 1 }, (error, data) => {
                    if (error) return next(error);

                    const disc = data[0].discriminator + 1;
        
                    const entry = {
                        discriminator: disc || 0,
                        link: LONG_URL
                    };
        
                    urls
                    .insert(entry)
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(next);
                });
            }
        });
    } else {
        res.status(422).json({
            status: 'error'
        });
    }
});

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message
    });
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});