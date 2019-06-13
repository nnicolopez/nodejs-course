const mongodb = require('mongodb');
const Product = require('../models/product');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
      pageTitle: "Add Product",
      path: '/admin/add-product',
      activeAddProduct: true,
      editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imgUrl, price, description } = req.body;
  const product = new Product({title, price, description, imgUrl});
  product.save()
    .then(result => {
      res.redirect('/admin/add-product');
    })
    .catch(err => {
      console.log(err);
    });
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
        product: product
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
    imgUrl, 
    description,
    productId
  } = req.body
  Product.findById(productId)
    .then(product => {
      product.title = title;
      product.price = price;
      product.imgUrl = imgUrl;
      product.description = description;
      return product.save()
    })
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('admin/products', {
        pageTitle: "Admin products",
        products,
        path: '/admin/products',
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