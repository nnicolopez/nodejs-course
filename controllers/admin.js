const mongodb = require('mongodb');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
      pageTitle: "Add Product",
      path: '/admin/add-product',
      activeAddProduct: true,
      editing: false,
      isAuthenticated: req.session.isLoggedIn
    });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({title, imageUrl, description, price, userId: req.user});
  product.save().then(result => {
    res.redirect('/admin/add-product');
  }).catch(error => {console.log(error)});
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/');
  }
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: true,
        product: product,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postEditProduct = (req, res, next) => {
  const { 
    title, 
    price, 
    imageUrl, 
    description,
    productId
  } = req.body
  Product.findById(productId)
    .then(product => {
      product.title = title,
      product.price = price,
      product.imageUrl = imageUrl,
      product.description = description
      return product.save()
    })
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('admin/products', {
        pageTitle: "Admin products",
        products,
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeletProduct = (req, res, next) => {
  prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
}