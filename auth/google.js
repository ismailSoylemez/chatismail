const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const findOrCreate = require('mongoose-find-or-create');


//models
const User = require('../models/Users');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
        clientSecret: process.env.GOOGLE_LOGIN_SECRET_ID,
        callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL
    },
    ((accessToken,refreshToken,profile,done) => {
        const data = profile._json;

    //mongodb ye kaydetmek gerekiyor ama öncesinde bu id daha önce var mı kontrol et
    User.findOrCreate({
      'googleID': data.sub
    }, {
        name: data.given_name,
        surname: data.family_name,
        ProfilePhotoUrl: data.picture
    }, (err,user) => {
        return done(err,user);
    })
  })
));

passport.serializeUser((user,done) => {
    done(null,user);
});
passport.deserializeUser((user,done) => {
    done(null,user);
});






module.exports = passport;