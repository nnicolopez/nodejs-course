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
  Product.findByPk(req.params.id)
    .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: product
    })
    .catch(err => console.log(err));
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
  Product.findByPk(productId)
    .then(product => {
      product.title = title;
      product.price = price;
      product.imgUrl = imgUrl;
      product.description = description;
      return product.save();
    })
    .then(result => {
      return res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.postAddProduct = (req, res, next) => {
  const {title, imgUrl, price, description} = req.body;
  Product.create({
    title,
    imgUrl,
    price,
    description
  })
    .then(result => {
      // console.log(result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(prods => {
      res.render('admin/products', {
        pageTitle: "Admin products",
        prods,
        path: '/admin/products',
      });
    })
    .catch(err => console.log(err));
};

exports.postDeletProduct = (req, res, next) => {
  prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('PRODUCT DELETED');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}