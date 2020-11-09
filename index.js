const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

const app = express();

// Middleware function
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

// Error-Handling middleware function that will log all application-level errors to th terminal
app.use((err, req, res, next) => {
  console.error(err.sstack);
  res.status(500).send('Something broke');
});

let movies = [
  {
    title: 'Enron, the smartest guys in the room',
    director: 'Alex Gibney',
    genre: 'Documentary',
    description: ''
  },
  {
    title: 'Bowling for Columbine',
    director: 'Michael Moore',
    genre: 'Documentary',
    description: ''
  },
  {
    title: 'Food, Inc',
    director: 'Robert Kenner',
    genre: 'Documentary',
    description: ''
  },
  {
    title: 'Inside Job',
    director: 'Charles Ferguson',
    genre: 'Documentary',
    description: ''
  },
  {
    title: 'Citizenfour',
    director: 'Laura Poitras',
    genre: 'Documentary',
    description: ''
  },
  {
    title: 'Cowspiracy',
    director: 'Kip Andersen',
    genre: 'Documentary',
    description: ''
  },
  {
    title: 'Ícaro',
    director: 'Bryan Fogel',
    genre: 'Documentary',
    description: ''
  },
  {
    title: 'Our Planet',
    director: 'Alastair Fothergill',
    genre: 'Documentary',
    description: ''
  },
  {
    title: 'Terra',
    director: 'Michael Pitiot',
    genre: 'Documentary',
    description: ''
  },
  {
    title: 'What the health',
    director: 'Kip Andersen',
    genre: 'Documentary',
    description: ''
  }
];

let users = [
  {
    Username: 'serch23',
    Password: 'lonely',
    Email: 'serch23@gmail.com',
    Birthday: '23/11/1989'
  }
];

// GET requests
// Returns a default textual response
app.get('/', (req, res) => {
  res.send('Enjoy the thousands of movies on MyFlix!');
});

//Get the Documentation file
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

//Get a list of data about the All movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Get the data about a single movie, by title
app.get('/movies/:title', (req, res) => {
  res.send('Successful GET request returning data on movie title: ' + req.params.title);
});

// Get the data about genres, by genre
app.get('/movies/genres/:genre', (req, res) => {
  res.send('Successful GET request returning data on movie genre: ' + req.params.genre);
});

// Get the data about a director, by name
app.get('/movies/directors/:name', (req, res) => {
  res.send('Successful GET request returning data on director: ' + req.params.name);
});

//Get a list of data about the All movies
app.get('/users', (req, res) => {
  res.json(users);
});

// POST requests
// Allow new users to register
app.post('/users', (req, res) => {
  res.send('Successful POST request registering new user: ' + req.params.name);
});

// Post a new movie to the "list of favourites movie" of a user
app.post('/users/:user/movies/:moviesID', (req, res) => {
  res.send('Successful POST request adding the movie: ' + req.params.name + ' in "Favourite List" of ' + req.params.user);
});

// PUT requests
// Update the Info of a user, by userName
app.put('/users/:user', (req, res) => {
  res.send('Successful PUT request updating information for the user: ' + req.params.user);
});

// DELETE requests
// Deregister a user from the database, by name
app.delete('/users/:user', (req, res) => {
  res.send('Successful DELETE request removed the user: ' + req.params.user);
});

// Deletes a movie from the "Favourite List", by name
app.delete('/users/:user/movies/:name', (req, res) => {
  res.send('Successful DELETE request removed movie from the Favourite List of the user: ' + req.params.user);
});

// listen for requests
app.listen(8080, () =>
console.log('Your app is listening on port 8080.')
);
