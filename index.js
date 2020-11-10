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
    Title: 'Enron, the smartest guys in the room',
    Director: 'Alex Gibney',
    Genre: 'Documentary',
    Description: ''
  },
  {
    Title: 'Bowling for Columbine',
    Director: 'Michael Moore',
    Genre: 'Documentary',
    Description: ''
  },
  {
    Title: 'Food, Inc',
    Director: 'Robert Kenner',
    Genre: 'Documentary',
    Description: ''
  },
  {
    Title: 'Inside Job',
    Director: 'Charles Ferguson',
    Genre: 'Documentary',
    Description: ''
  },
  {
    Title: 'Citizenfour',
    Director: 'Laura Poitras',
    Genre: 'Documentary',
    Description: ''
  },
  {
    Title: 'Cowspiracy',
    Director: 'Kip Andersen',
    Genre: 'Documentary',
    Description: ''
  },
  {
    Title: 'Ícaro',
    Director: 'Bryan Fogel',
    Genre: 'Documentary',
    Description: ''
  },
  {
    Title: 'Our Planet',
    Director: 'Alastair Fothergill',
    Genre: 'Documentary',
    Description: ''
  },
  {
    Title: 'Terra',
    Director: 'Michael Pitiot',
    Genre: 'Documentary',
    Description: ''
  },
  {
    Title: 'What the health',
    Director: 'Kip Andersen',
    Genre: 'Documentary',
    Description: ''
  }
];

let users = [
  {
    User: 'serch23',
    Password: 'lonely',
    Email: 'serch23@gmail.com',
    Birthdate: '23/11/1989'
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
  // let newUser = req.body;
  //
  // if (!newUser.user) {
  //   const message = 'Missing "name" in request body';
  //   res.status(400).send(message);
  // } else {
  //   newUser.id = uuid.v4();
  //   users.push(newUser);
  //   res.status(201).send(newUser);
  // }
  res.send('Successful POST request registering new user');
});

// Post a new movie to the "list of favourites movie" of a user
app.post('/users/:user/movies/:title', (req, res) => {
  res.send('Successful POST request adding the movie: ' + req.params.title + ' in "Favourite List" of ' + req.params.user);
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
app.delete('/users/:user/movies/:title', (req, res) => {
  res.send('Successful DELETE request removed movie from the Favourite List of the user: ' + req.params.user);
});

// listen for requests
app.listen(8080, () =>
console.log('Your app is listening on port 8080.')
);
