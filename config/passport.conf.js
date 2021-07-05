
// Load User model
const Client = require('../models/Client');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Client.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: ' Email không tồn tại' });
        }

        // Match password
        // bcrypt.compare(password, user.password, (err, isMatch) => {
        //   if (err) throw err;
        //   if (isMatch) {
        //     return done(null, user);
        //   } else {
        //     return done(null, false, { message: 'Có lỗi! Mật khẩu không đúng' });
        //   }
        // });
        if(password == user.password){
          return done(null, user);
        }
        else return done(null, false, { message: ' Mật khẩu không đúng' });

      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Client.findById(id, function(err, user) {
      done(err, user);
    });
  });
};