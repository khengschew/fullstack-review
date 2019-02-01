const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  full_name: String,
  owner: {
    login: String,
    id: Number,
    type: String
  },
  private: Boolean,
  description: String,
  fork: Boolean,
  created_at: String,
  updated_at: String,
  pushed_at: String,
  size: Number,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  forks: Number,
  open_issues_count: Number,
  open_issues: Number
});

// Note: you can add methods tied to a schema in mongoose
// E.g.
// repoSchema.methods.ownerInfo = function() {
//   console.log(`This repo is owned by ${this.name}, created on ${this.created_at}`);
// }
// Once a repo is created, you can call ownerInfo on the repo
// This is similar to adding a method to a prototype

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoArr, cb) => {
  repoArr.forEach((repo) => {
    // console.log(repo);
    repo.save(cb);
  });
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

module.exports.save = save;