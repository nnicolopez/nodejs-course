const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);


// const { ObjectId } = require('mongodb');
// const db = require('../util/database');

// module.exports = class Product {
//   constructor(title, imgUrl, description, price, id, userId) {
//     this.title = title;
//     this.imgUrl = imgUrl;
//     this.description = description;
//     this.price = price;
//     this._id = id ? new ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     let dbOperation;
//     if (this._id) {
//       dbOperation = db.collection('products').updateOne(
//         {_id: this._id},
//         {$set: this}
//       );
//     } else {
//       dbOperation = db.collection('products').insertOne(this);
//     }
//     return dbOperation
//       .then(result => {
//         // console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     return db.collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(id) {
//     return db.collection('products')
//       .deleteOne({_id: new ObjectId(id)})
//       .then(result => {
//         // console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }


//   static findById(id) {
//     return db.collection('products')
//       .find({ _id: new ObjectId(id) })
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }