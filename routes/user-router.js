const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const path = require('path');

const { SECRET, EXPIRATIONTIME } = require('../config/app.config');
const { logger } = require('../config/logger.config');

const {User} = require('../models');
const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'No request body'});
    }

    if (!('username' in req.body)) {
        return res.status(422).json({message: 'Missing field: username'});
    }

    let {username, password, firstName, lastName} = req.body;


    if (typeof username !== 'string') {
        return res.status(422).json({message: 'Incorrect field type: username'});
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({message: 'Incorrect field length: username'});
    }

    if (!(password)) {
        return res.status(422).json({message: 'Missing field: password'});
    }

    if (typeof password !== 'string') {
        return res.status(422).json({message: 'Incorrect field type: password'});
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({message: 'Incorrect field length: password'});
    }

    return User
    .find({username})
    .count()
    .exec()
    .then(count => {
        if (count > 0) {
            return res.status(422).json({message: 'Username is already taken.'});
        }
        return User.hashPassword(password);
    })
    .then(hash => {
        return User
        .create({
            username: username,
            password: hash,
            firstName: firstName,
            lastName: lastName,
            joinedDate: Date.now()
        });
    })
    .then(user => {
        return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
        logger.error(err);
        return res.status(500).sendFile(path.join(__dirname, '../public', 'error.html'));
    });
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'missing field in body'});
    }
    User
    .findOne({username: username})
    .exec()
    .then(_user => {
        const user = _user;
        if (!user) {
            return res.status(401).json({message: 'Incorrect username.'});
        }
        return user;
    })
    .then(user => {
        if (!user.validatePassword(password)) {
            return res.status(401).json({message: 'Incorrect password.'});
        } else {
            const token = jwt.sign(user, SECRET);
            res.status(200).json({
                success: true,
                token: 'JWT ' + token,
                tokenExpiration: new Date(Date.now() + EXPIRATIONTIME),
                user: user.apiRepr()
            });
        }
    })
    .catch(err => {
        logger.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = { router };
