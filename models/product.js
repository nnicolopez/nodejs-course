const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'products.json');

const Cart = require('../models/cart');

const getProductsFromFile = cb => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(content));
        }
    });
}

module.exports = class Product {
    constructor(id, title, imgUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
                  if (err){
                      console.log(err);
                  }
              });
            } else {
              this.id = Math.random().toString();
              products.push(this);
              fs.writeFile(filePath, JSON.stringify(products), (err) => {
                  if (err){
                      console.log(err);
                  }
              });
            }
        });
    }

    static deleteById(id) {
      getProductsFromFile(products => {
        const product = products.find(prod => prod.id === id);
        const updatedProducts = products.filter(prod => prod.id !== id);
        fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
          if (!err) {
            Cart.deleteProduct(id, product.price);
          }
        });
      });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            cb(product);
        });
    }
}