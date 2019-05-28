const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
      pageTitle: "Add Product",
      path: '/admin/add-product',
      activeAddProduct: true,
      editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/');
  }
  Product.findById(req.params.id, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: product
    });
  });
}

exports.postEditProduct = (req, res, next) => {
  const { 
    productId, 
    title, 
    price, 
    imgUrl, 
    description
  } = req.body
  const updatedProduct = new Product(
    productId, 
    title, 
    imgUrl, 
    description, 
    price
  );
  updatedProduct.save();
  return res.redirect('/admin/products');
}

exports.postAddProduct = (req, res, next) => {
  const {title, imgUrl, price, description} = req.body;
  const product = new Product(null, title, imgUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(prods => {
    res.render('admin/products', {
      pageTitle: "Admin products",
      prods,
      path: '/admin/products',
    });
  });
};

exports.postDeletProduct = (req, res, next) => {
  prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}