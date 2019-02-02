const express = require('express');
const morgan = require('morgan');
const db = require('../database/index.js');
const github = require('../helpers/github.js');
let app = express();

app.use(express.json());
app.use(morgan('default'));


app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body.term, (err, data) => {
    if (err) {
      console.log('there is an error');
      res.send(err);
    } else {
      if (data.statusCode === 200) {
        db.save(JSON.parse(data.body), (err, data) => {
          if (err) res.send(error);
          console.log('sending data!');
          res.send({});
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
  db.top25((err, data) => {
    res.send(data);
  })
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

