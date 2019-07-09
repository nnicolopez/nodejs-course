const path = require('path');
const uri = 'mongodb+srv://nnicolopez:eaeDQQHJb48G2TmF@cluster0-0kqee.mongodb.net/shop?retryWrites=true&w=majority'
// const uri = 'mongodb://localhost:27017/shop';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5d02e3a5a8aa1f1efadc6656')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            username: 'Nico',
            email: 'nico@test.com',
            cart: { items: [] }
          });
          user.save();
        }
      })
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })
