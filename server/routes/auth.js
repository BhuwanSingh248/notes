const express = require('express');
const router = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User')

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:5000/google/callback"
},
async (accessToken, RefreshToken, profile, done) => {
    const newUser = {
        googleId : profile.id,
        displayName:profile.desplayName,
        firstName:profile.name.givenName,
        LastName:profile.name.familyName,
        image:profile.photos[0].value
    }
    try {
        let user = await User.findOne({
            googleId:profile.id
        });
        if (user) {
            done(null, user)
        }
        else {
            user = await User.create(newUser);
            done(null, user)
        }
    } catch (error){
        console.log(error)
    }
}));

module.exports = router;


router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login-failed',
    successRedirect:'/dashboard' 
    }),
  );

//   if something get wrong 
router.get("/login-failed", (req, res) => {
    res.send('Something went wrong')
    });

// persist user data after sucessful authentications
passport.serializeUser((user, done) =>{
    done(null, user.id); 
});


// retrieve user data from session
passport.deserializeUser((id, done) =>{
    User.findById(id);
})