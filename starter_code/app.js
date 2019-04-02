const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        title: "Beers",
        beers
      });
    })
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render('random-beer', {
        title: `${beers[0].name} - Random Beer`,
        beers,
      });
    })
    .catch(error => {
      console.log(error)
    })
});


app.listen(3000);