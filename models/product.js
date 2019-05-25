const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'products.json');

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
    constructor(title, imgUrl, description, price) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                if (err){
                    console.log(err);
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
        })
    }
}