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
              return res.status(422).json({message: 'username already taken'});
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
          })
          .then(user => {
              return res.status(201).json(user.apiRepr());
          })
          .catch(err => {
              logger.error(err);
              return res.status(500).json({message: 'Internal Server Error'});
          });
      });
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'missing field in body'});
    }
    User
    .findOne({username: username}, function(err, user) {
        if (err) {
            return res.status(500).json({message: 'Internal Server error'});
        }
        if (!user) {
            return res.status(404).json({message: 'Incorrect Username'});
        } else {
            user.validatePassword(password, function(err, isMatch) {
                if (isMatch && !err) {
                    const token = jwt.sign(user, SECRET);
                    return res.status(200).json({
                        success: true,
                        token: 'JWT ' + token,
                        tokenExpiration: new Date(Date.now() + EXPIRATIONTIME),
                        user: user.apiRepr()
                    });
                } else {
                    res.status(401).json({message: 'authentication failed'});
                }
            });
        }
    });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({user: req.user.apiRepr()});
});

module.exports = { router };
