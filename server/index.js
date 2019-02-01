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
    if (err) {
      console.log('there is an error');
      res.send(err);
    } else {
      // Need to check whether status code is 200, otherwise don't do anything
      if (data.statusCode === 200) {
        db.save(JSON.parse(data.body), data => {
          console.log('sending data!');
          res.send(data);
        });
      } else {
        console.log('no data found!');
        res.status(404).send({});
      }
    }
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

