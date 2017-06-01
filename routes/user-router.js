const express = require('express');
const passport = require('passport');
const {BasicStrategy} = require('passport-http');
const path = require('path');
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

router.post('/login', passport.authenticate('basic', { session: false }), (req, res) => {
    res.json(req.user);
});

module.exports = { router };
