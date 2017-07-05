const express = require('express');
const passport = require('passport');

const {
  logger
} = require('../config/logger.config');

const {
  List
} = require('../models');

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

router.post('/id/:id',
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
          } else if (list.listUsers.indexOf(req.user.username) !== -1 || list.listOwner === req.user.id) {
              return res.status(200).json({
                  list: list.apiRepr()
              });
          } else {
              return res.status(401).json({
                  message: 'You do not have access to that list'
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

router.get('/',
  passport.authenticate('jwt', {
      session: false
  }), (req, res) => {
      return List
      .find({
          'listOwner': req.user._id
      })
      .exec()
      .then(lists => {
          return res.status(200).json({
              lists: lists.map(list => list.apiRepr())
          });
      })
      .catch(err => {
          logger.error(err);
          return res.status(500).json({
              message: 'Oops! internal server error'
          });
      });
  });


router.get('/shared',
            passport.authenticate('jwt', {
                session: false
            }), (req, res) => {
                return List
                .find({
                    'listUsers': req.user.username
                })
                .exec()
                .then(lists => {
                    return res.status(200).json({
                        lists: lists.map(list => list.apiRepr())
                    })
                  .catch(err => {
                      logger.error(err);
                      return res.status(500).json({
                          message: 'Oops! internal server error'
                      });
                  });
                });
            });

router.delete('/id/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    List
    .findOneAndRemove({_id: req.params.id})
    .exec()
    .then(() => {
        return res.status(200).json({message: 'list successfully deleted'});
    })
    .catch(err => {
        logger.error(err);
        return res.status(500).json({message: 'internal server error occured'});
    });
});


router.put('/id/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const updatedList = req.body.list;

    List
    .findOneAndUpdate({_id: req.params.id}, updatedList)
    .exec()
    .then((list) => {
        res.status(200).json({
            message: 'List has been updated',
            list: list.apiRepr()
        });
    })
    .catch(err => {
        logger.error(err);
        res.status(500).json({messsage: 'Could not update list'});
    });
});

module.exports = {
    router
};
