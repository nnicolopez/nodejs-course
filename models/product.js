const getDb = require('../util/database').getDb;

module.exports = class Product {
  constructor(title, imgUrl, description, price) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db.collection('products').insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // static deleteById(id) {

  // }

  // static fetchAll(cb) {

  // }

  // static findById(id, cb) {

  // }
}