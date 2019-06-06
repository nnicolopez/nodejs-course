const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://nnicolopez:eaeDQQHJb48G2TmF@cluster0-0kqee.mongodb.net/shop?retryWrites=true&w=majority'

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;