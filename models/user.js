const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
})

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cartItem => {
    console.log(cartItem.productId, product._id)
    return cartItem.product.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({product: product._id, quantity: newQuantity})
  }

  this.cart = {items: updatedCartItems};
  return this.save()
}

userSchema.methods.removeFromCart = function (productId) {
  this.cart.items = this.cart.items.filter(item => {
    return item.product.toString() !== productId;
  });
  return this.save()
}

userSchema.methods.clearCart = function () {
  this.cart = [];
  return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const db = require('../util/database');

// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id ? new ObjectId(id) : null;
//   }

//   save() {
//     return db.collection('users').insertOne(this)
//   }

//   static findById(id) {
//     return db.collection('users').findOne({_id: new ObjectId(id)});
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cartItem => {
//       console.log(cartItem.productId, product._id, cartItem.productId === product._id)
//       return cartItem.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({productId: product._id, quantity: newQuantity})
//     }

//     const updatedCart = {items: updatedCartItems};
//     return db.collection('users').updateOne(
//       {_id: this._id},
//       {$set: {cart: updatedCart}}
//     );
//   }

//   removeFromCart(prodId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== prodId.toString();
//     });
//     return db.collection('users').updateOne(
//       {_id: this._id},
//       {$set: {cart: {items: updatedCartItems}}}
//     );
//   }

//   getCart() {
//     const productIds = this.cart.items.map(item => item.productId);
//     return db.collection('products').find({_id: {$in: productIds}})
//       .toArray()
//       .then(products => {
//         return products.map(product => {
//           return {
//             ...product, 
//             quantity: this.cart.items.find(prod => {
//               return prod.productId.toString() === product._id.toString();
//             }).quantity
//           }
//         })
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   addOrder() {
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
//     return db.collection('orders').find({'user._id': this._id}).toArray();
//   }
// }

// module.exports = User;