const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const mongoUri = 'mongodb://localhost/poke';


mongoose.connect(mongoUri)
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log('you did not connect to mongodb'));

const userSchema = new Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
  },
  deckId: String,
  favPokemonName: String,
  favPokemonType1: String, 
  favPokemonImage: String,
  favPokemonType2: String,
  avatar: String,
  description: String,
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const chatSchema = new Schema({
  receiver: {
    type: String,
    require: true,
  },
  sender: {
    type: String,
    require: true
  },
  message: String,
  date: String
});

const deckSchema = new Schema({
  cardId: String,
  userId: String,
  cardName: String,
  image: String
});

const User = mongoose.model('User', userSchema);
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
},
function (accessToken, refreshToken, profile, cb) {
  User.findOneAndUpdate(
    { password: profile._json.email }, // search for the user with this email (password)
    { $set: { // if id is not found create it with these inputs
      _id: profile.id,
      password: profile._json.email,
      firstName: profile._json.given_name,
      lastName: profile._json.family_name,
      avatar: profile._json['picture'],
    }},
    { upsert: true}, // allows functionality option to create what is not there
    (err, user) => { // serelize the user
      return cb(err, user);
    }
    // option to allow such functionality
  );
}
));
const Deck = mongoose.model('Deck', deckSchema);
const Chat = mongoose.model('Chat', chatSchema);
passport.use(User.createStrategy());


passport.serializeUser( (user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


module.exports = {
  Deck,
  User,
  Chat,
};
