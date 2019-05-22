const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
      pageTitle: "Add Product",
      path: '/admin/add-product',
      activeAddProduct: true
  });
};

exports.editProduct = (req, res, next) => {
res.render('admin/edit-product', {
  pageTitle: 'Edit Product',
  path: '/admin/edit-product'
});
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      pageTitle: "Admin products",
      products,
      path: '/admin/products',
    });
  });
};