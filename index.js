const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const morgan = require('morgan');

const { logger } = require('./config/logger.config');
const { DATABASE_URL, PORT, SECRET } = require('./config/app.config');

const { router: userRouter } = require('./routes/user-router');

const { User } = require('./models');

//configuration//
mongoose.Promise = global.Promise;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('build'));

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User
      .findOne({_id: jwt_payload._doc._id},
        function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
}));

//Routes//
app.get('/', (req, res) => {
    res.json({message: 'welcome', user: req.user});
});

app.use('/api/users', userRouter);

app.get('*', (req, res) => {
    res.status(404).send('Whoops something went wrong!');
});

//Server Start up functions//
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
