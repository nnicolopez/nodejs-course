const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = ObjectId(id);
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
      updatedCartItems.push({productId: product._id, quantity: newQuantity})
    }

    const updatedCart = {items: updatedCartItems};
    return db.collection('users').updateOne(
      {_id: this._id},
      {$set: {cart: updatedCart}}
    );
  }

  removeFromCart(prodId) {
    const db = getDb();
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== prodId.toString();
    });
    return db.collection('users').updateOne(
      {_id: this._id},
      {$set: {cart: {items: updatedCartItems}}}
    );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(item => item.productId);
    return db.collection('products').find({_id: {$in: productIds}})
      .toArray()
      .then(products => {
        return products.map(product => {
          return {
            ...product, 
            quantity: this.cart.items.find(prod => {
              return prod.productId.toString() === product._id.toString();
            }).quantity
          }
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db.collection('users').findOne({_id: ObjectId(id)});
  }
}

module.exports = User;