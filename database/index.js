const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  githubId: Number,
  name: String,
  full_name: String,
  owner_login: String,
  owner_id: Number,
  owner_url: String,
  owner_type: String,
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
    var repoDb = {
      githubId: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      owner_login: repo.owner.login,
      owner_id: repo.owner.id,
      owner_url: repo.owner.url,
      owner_type: repo.owner.type,
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
    };

    results.push(Repo.findOneAndUpdate({githubId: repo.id}, repoDb, {upsert:true}), (err, value) => {
      if (err) throw err;
      return value;
    });
  });

  Promise.all(results)
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

module.exports.save = save;