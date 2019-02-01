const express = require('express');
const morgan = require('morgan');
const db = require('../database/index.js');
const github = require('../helpers/github.js');
let app = express();

app.use(express.json());
app.use(morgan('default'));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body.term, (err, data) => {
    res.send(data);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

