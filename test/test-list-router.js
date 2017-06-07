const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const {app, runServer, closeServer} = require('../index.js');
const {List} = require('../models');

const {TEST_DATABASE_URL} = require('../config/app.config');
const {logger} = require('../config/logger.config');

const should = chai.should();

function seedDB () {
    logger.info('Seeding databse with list data');

    const seedData = [];

    for (let i; i<=10; i++) {
        seedData.push({
            listName: faker.random.words(),


        });
    }
}

describe('List Router Tests', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
});
