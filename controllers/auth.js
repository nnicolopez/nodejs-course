const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
      pageTitle: 'Login',
      path: '/login',
      isAuthenticated: req.session.isLoggedIn
    });
  };

exports.postLogin = (req, res, next) => {
  User.findById('63e42929711520f2e6e74010')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    console.log('error', error);
    res.redirect('/');
  });
}