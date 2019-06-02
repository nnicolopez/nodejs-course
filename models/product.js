const db = require('../util/database');

const Cart = require('../models/cart');

module.exports = class Product {
  constructor(id, title, imgUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
  }

  static deleteById(id) {
    
  }

  static fetchAll() {
    return db.execute('SELECT * from products');
  }

  static findById(id) {}
}