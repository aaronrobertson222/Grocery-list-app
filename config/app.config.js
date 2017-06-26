require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://localhost/grocery-app-db';

exports.TEST_DATABASE_URL = 'mongodb://localhost/grocer-app-test-db';

exports.PORT = process.env.PORT || 8080;

exports.SECRET = process.env.SECRET || 'secrettest';
exports.EXPIRATIONTIME = process.env.EXPIRATIONTIME;
