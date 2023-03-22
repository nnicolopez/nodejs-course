const path = require('path');
const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('63e42929711520f2e6e74010')
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

mongoose.connect('mongodb+srv://nnicolopez:Ri8fbF.6sYSv9.T@nodejs-course.mwzwalm.mongodb.net/nodejs-course?retryWrites=true&w=majority')
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Nico',
          email: 'nico@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    }).catch(error => {
      console.log(error);
    })
    
    app.listen(3000);
  })
  .catch(error => console.log(error))
