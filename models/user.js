const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  addToCart(product) {
    const db = getDb();
    const cartProductIndex = this.cart.items.findIndex(cartItem => {
      return cartItem.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({productId: product._id, quantity: quantity})
    }

    const updatedCart = {items: updatedCartItems};
    return db.collection('users').updateOne(
      {_id: ObjectId(this._id)},
      {$set: {cart: updatedCart}}
    );
  }

  static findById(id) {
    const db = getDb();
    return db.collection('users').findOne({_id: ObjectId(id)});
  }
}

module.exports = User;