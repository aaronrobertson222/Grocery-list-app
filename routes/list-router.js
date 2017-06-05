const express = require('express');
const passport = require('passport');

const { logger } = require('../config/logger.config');

const {List} = require('../models');

const router = express.Router();

router.post('/',
            passport.authenticate('jwt', {
                session: false
            }), (req, res) => {

                const newList = {
                    listName: req.body.listName,
                    listOwner: req.user.id,
                    dateCreated: Date.now(),
                    items: req.body.items,
                    listUsers: req.body.listUsers
                };

                return List
                .create(newList)
                .then(list => {
                    return res.status(201).json({
                        message: 'List creation success!',
                        list: list.apiRepr()
                    })
                .catch(err => {
                    logger.error(err);
                    return res.status(500).json({
                        message: 'Oops! Internal server error...'
                    });
                });
                });
            });

router.get('/:id',
           passport.authenticate('jwt', {
               session: false
           }), (req, res) => {
               return List
              .findOne({
                  '_id': req.params.id
              })
              .exec()
              .then(list => {
                  if (!list) {
                      return res.status(404).json({
                          message: 'List not found.'
                      });
                  } else {
                      return res.status(200).json({
                          list: list.apiRepr()
                      });
                  }
              })
              .catch(err => {
                  logger.error(err);
                  return res.status(500).json({
                      message: 'Oops! Internal server error'
                  });

              });
           });


module.exports = { router };
