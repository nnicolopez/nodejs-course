const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Product', productSchema)

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// module.exports = class Product {
//   constructor(title, imgUrl, description, price, id, userId) {
//     this.title = title;
//     this.imgUrl = imgUrl;
//     this.description = description;
//     this.price = price;
//     this._id = id ? mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
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
//     const db = getDb();
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
//     const db = getDb();
//     return db.collection('products')
//       .deleteOne({_id: mongodb.ObjectId(id)})
//       .then(result => {
//         // console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }


//   static findById(id) {
//     const db = getDb();
//     return db.collection('products')
//       .find({ _id: mongodb.ObjectId(id) })
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }