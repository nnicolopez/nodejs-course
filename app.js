const path = require('path');
const uri = 'mongodb+srv://nnicolopez:eaeDQQHJb48G2TmF@cluster0-0kqee.mongodb.net/shop?retryWrites=true&w=majority'
// const uri = 'mongodb://localhost:27017/shop';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5cfeef4a4142ff50c04ab75d')
//     .then(user => {
//       req.user = new User(user.username, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoose.set('useFindAndModify', false);
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })
