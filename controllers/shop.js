const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(prods => {
      res.render('shop/product-list', {
        pageTitle: "All Products",
        prods,
        path: '/products',
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.id;
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
        path: '/products',
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(prods => {
    res.render('shop/product-list', {
      pageTitle: "All Products",
      prods,
      path: '/',
    });
  })
  .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  console.log(req.user.cart)
  req.user.getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products
      });
    })
    .catch(err => console.log(err));
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let quantity = 1;

  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: {id: prodId} });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        quantity = oldQuantity + 1;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: quantity
        }
      })
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({where : {id: prodId} });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};

exports.postOrders = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
          }));
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};