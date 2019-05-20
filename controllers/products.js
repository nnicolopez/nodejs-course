const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            pageTitle: "Shop",
            products,
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true
        });
    });

}