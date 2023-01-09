const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');
const Pangolin = require('./model');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const session = require('express-session');




// on utilise cors pour nous permettre de requetter l api depuis le front Important
app.use(cors());

// imoprtant utiliser le body parser sinon ça ne marchera pas
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('test de l api: url par defaut ');
});

app.listen(3000, function () {
    console.log('L application ecoute sur le port 3000 en localhost !');
});

// important: mettre app.get() avant app.use()
// get de la liste des pangolins de la bdd
app.get('/pangolin/',routes);
app.use('/pangolin',routes);

//utilisation de la méthode post pour ajouter un pangolin dans la base mongoDB
app.post('/AddPangolin/',routes.post('/AddPangolin'));
app.use('AddPangolin',routes);


app.post('/login/',routes.post('/login'));
app.use('login',routes);


/*passport.serializeUser((pangolin, done) => {
    // Serialize the user's ID into the session store
    done(null, pangolin.id);
});

passport.deserializeUser((id, done) => {
    // Find the user with the matching ID in the database
    Pangolin.findById(id, (err, pangolin) => {
        if (err) { return done(err); }
        done(null, pangolin);
    });
});
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
*/


/*
app.post('/login/',routes.post('/login'))
app.use('login',routes)
*/

// tester la connection avec ma base de données, voir si le pangolin a été enregistré dans la bdd
/*
const firstPangolin = new Pangolin({
   name: 'test',
    role:'Sorcier',
    ami:'testami',
    login:'Ftest',
    password:'pass'
});
firstPangolin.save(error => {console.log('Pangolin enregistré');}); */