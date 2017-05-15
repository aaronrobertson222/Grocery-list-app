const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({message: 'welcome'});
});

app.get('*', (req, res) => {
  res.status(404).send('WhooOoooOps something went trong!');
});

let server;

function runServer(databaseUrl) {
  return new Promise((res, rej) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return rej(err);
      }
      console.log(`connected to ${databaseUrl}`);
      server = app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
        res();
      })
      .on('error', err => {
        mongoose.disconnect();
        rej(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((res, rej) => {
      console.log('Closing server.');
      server.close(err => {
        if (err) {
          return rej(err);
        }
        res();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.log(err));
}

module.exports = {app, runServer, closeServer};
