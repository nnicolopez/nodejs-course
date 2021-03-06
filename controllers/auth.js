const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let errMsg = req.flash('errMsg');
  errMsg = errMsg.length > 0 ? errMsg[0] : null;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errMsg: errMsg
  });
}

exports.getSignup = ((req, res, next) => {
  let errMsg = req.flash('errMsg');
  errMsg = errMsg.length > 0 ? errMsg[0] : null;
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    errMsg: errMsg
  })
})

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
    .then(user => {
      if (!user) {
        req.flash('errMsg', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('errMsg', 'Invalid email or password.');
          return res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          return res.redirect('/login');
        });
      
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({email: email})
    .then(userDoc => {
      if (userDoc) {
        req.flash('errMsg', 'Email already in use.');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User ({
            email: email,
            password: hashedPassword
          });
          user.save();
          return res.redirect('/login');
        });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
}