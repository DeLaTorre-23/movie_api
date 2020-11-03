const express = require('express'),
  app = express(),
  morgan = require('morgan')
  ;

let topMovies = [
  {
    title: 'Enron, the smartest guys in the room',
    author: 'Alex Gibney'
  },
  {
    title: 'Bowling for Columbine',
    author: 'Michael Moore'
  },
  {
    title: 'Food, Inc',
    author: 'Robert Kenner'
  },
  {
    title: 'Inside Job',
    author: 'Charles Ferguson'
  },
  {
    title: 'Citizenfour',
    author: 'Laura Poitras'
  },
  {
    title: 'Cowspiracy',
    author: 'Kip Andersen'
  },
  {
    title: 'Ícaro',
    author: 'Bryan Fogel'
  },
  {
    title: 'Our Planet',
    author: 'Alastair Fothergill'
  },
  {
    title: 'Terra',
    author: 'Michael Pitiot'
  },
  {
    title: 'What the health',
    author: 'Kip Andersen'
  }
];

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(myLogger);
app.use(express.static('public'));
app.use(morgan('common'));

// GET requests
app.get('/', (req, res) => {
  res.send('Enjoy the thousands of movies on MyFlix!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// listen for requests
app.listen(8080, () =>
console.log('Your app is listening on port 8080.')
);
