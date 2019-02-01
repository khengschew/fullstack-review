const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  full_name: String,
  owner: {
    login: String,
    id: Number,
    url: String,
    type: String
  },
  private: Boolean,
  description: String,
  fork: Boolean,
  url: String,
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
  var results = [];
  repoArr.forEach((repo) => {
    console.log(repo.id);
    var repoDb = new Repo({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      ownerLogin: repo.owner.login,
      ownerId: repo.owner.id,
      ownerUrl: repo.owner.url,
      ownerType: repo.owner.type,
      private: repo.private,
      description: repo.description,
      fork: repo.fork,
      url: repo.url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      size: repo.size,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      forks: repo.forks,
      open_issues_count: repo.open_issues_count,
      open_issues: repo.open_issues
    });
    results.push(repoDb.save());
  });

  Promise.all(results)
    .then((results) => cb(results));
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

module.exports.save = save;