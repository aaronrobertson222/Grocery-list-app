const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const { logger } = require('./config/logger.config');


mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config/app.config');

const { router: userRouter } = require('./routes/user-router');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static('build'));

app.get('/', (req, res) => {
    res.json({message: 'welcome'});
});

app.use('/api/users', userRouter);

app.get('*', (req, res) => {
    res.status(404).send('Whoops something went wrong!');
});

let server;

function runServer(databaseUrl) {
    return new Promise((res, rej) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return rej(err);
            }
            logger.info(`connected to ${databaseUrl}`);
            server = app.listen(PORT, () => {
                logger.info(`App is listening on port ${PORT}`);
                res();
            })
      .on('error', err => {
          mongoose.disconnect();
          rej(err);
      });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((res, rej) => {
            logger.info('Closing server.');
            server.close((err) => {
                if (err) {
                    return rej(err);
                }
                return res();
            });
        });
    });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => logger.error(err));
}

module.exports = { app, runServer, closeServer };
