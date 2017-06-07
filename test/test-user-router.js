const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const {app, runServer, closeServer} = require('../index.js');
const {User} = require('../models');

const {TEST_DATABASE_URL} = require('../config/app.config');
const {logger} = require('../config/logger.config');

const should = chai.should(); // eslint-disable-line
chai.use(chaiHttp);

function tearDownTestDb() {
    logger.warn('Tearing down test database');
    return mongoose.connection.dropDatabase();
}

describe('User Router Tests', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        tearDownTestDb();
        return closeServer();
    });

    describe('New user POST endpoint', function() {
        const newUser = {
            username: faker.internet.userName(),
            password: faker.internet.password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            joinedDate: Date.now()
        };
        return chai.request(app)
          .post('/users')
          .send(newUser)
          .then(function(res) {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.include.keys('username', 'password', 'firstName', 'lastName', 'joinedDate');
              res.body.id.should.not.be.null;
              res.body.username.should.equal(newUser.username);
              res.body.name.should.equal(`${newUser.firstName} ${newUser.lastName}`);
              return User.findById(res.body.id).exec();
          })
          .then(function(user) {
              user.username.should.equal(newUser.username);
              user.firstName.should.equal(newUser.firstName);
              user.lastName.should.equal(newUser.lastName);
          });
    });
});
