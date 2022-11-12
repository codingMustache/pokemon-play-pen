const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const { User } = require('./routes/userRoutes.js');
const { Deck } = require('./routes/deckRoutes.js');
const { Pokedex } = require('./routes/pokedexRoutes.js');
const { Chat } = require('./routes/chat');

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

const app = express();
app.use(session({
  secret: 'Our little secret.',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.redirect('/');
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/dist/login')));
app.use('/home', isLoggedIn, express.static(path.join(__dirname, '../client/dist')));
app.use( express.static(CLIENT_PATH));


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  })
);

app.get('/auth/failure', (req, res) => {
  res.redirect('/login');
});


app.use('/api/user', User);
app.use('/api/pokedex', Pokedex);
app.use('/api/deck', Deck);
app.use('/api/chat', Chat);


app.use('*', (req, res)=>{
  res.sendFile(path.join(CLIENT_PATH, 'index.html'), (err)=>{
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = {
  app,
};
