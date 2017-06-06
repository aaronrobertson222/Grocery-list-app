const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../index.js');
const {User} = require('../models');

const {TEST_DATABASE_URL} = require('../config/app.config');

const should = chai.should();
