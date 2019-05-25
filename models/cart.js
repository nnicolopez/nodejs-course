const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {

  static addProduct(id, productPrice) {
    fs.readFile(filePath, (err, content) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(content);
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id = id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {id: id, quantity: 1};
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });

  }

}