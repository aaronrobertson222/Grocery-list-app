require('dotenv').config();

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL ||
                        global.DATABASE_URL ||
                       'mongodb://localhost/grocery-app-db',

    TEST_DATABASE_URL: 'mongodb://localhost/grocer-app-test-db',
    PORT: process.env.PORT || 8080,
    SECRET: process.env.SECRET || 'secrettest',
    EXPIRATIONTIME: process.env.EXPIRATIONTIME,
};
