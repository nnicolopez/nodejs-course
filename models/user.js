const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }, 
        quantity: {type: Number, required: true}
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cartItem => {
    return cartItem.product._id.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      product: product,
      quantity: newQuantity
    })
  }

  const updatedCart = {items: updatedCartItems};
  this.cart = updatedCart;
  return this.save();
}

userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.product._id.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
}

module.exports = mongoose.model('User', userSchema);


// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = ObjectId(id);
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this)
//   }

//   static findById(id) {
//     const db = getDb();
//     return db.collection('users').findOne({_id: ObjectId(id)});
//   }

//   addToCart(product) {
//   }

//   removeFromCart(prodId) {
//     const db = getDb();
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== prodId.toString();
//     });
//     return db.collection('users').updateOne(
//       {_id: this._id},
//       {$set: {cart: {items: updatedCartItems}}}
//     );
//   }

//   getCart() {

//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: this._id,
//             username: this.username
//           }
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then(result => {
//         this.cart = {items: []};
//         return db.collection('users')
//           .updateOne(
//             {_id: this._id},
//             {$set: {cart: {items: []}}}
//           );
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db.collection('orders').find({'user._id': this._id}).toArray();
//   }
// }

// module.exports = User;