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
    Id: '',
    Title: 'Enron, the smartest guys in the room',
    Director: 'Alex Gibney',
    Genre: 'Documentary',
    Description: ' It tells the story of how Enron rose to become the seventh largest corporation in America with what was essentially a Ponzi scheme, and in its last days looted the retirement funds of its employees to buy a little more time.'
  },
  {
    Id: '',
    Title: 'Bowling for Columbine',
    Director: 'Michael Moore',
    Genre: 'Documentary',
    Description: 'It is a film American documentary written, directed and narrated by Michael Moore explores what suggests manager are the main causes of the slaughter at Columbine in 1999 and other acts of violence with firearms in the United States.'
  },
  {
    Id: '',
    Title: 'Food, Inc',
    Director: 'Robert Kenner',
    Genre: 'Documentary',
    Description: 'The film examines corporate farming in the United States, concluding that agribusiness produces food that is unhealthy, in a way that is environmentally harmful and abusive of both animals and employees.'
  },
  {
    Title: 'Inside Job',
    Director: 'Charles Ferguson',
    Genre: 'Documentary',
    Description: 'Inside Job is a 2010 American documentary film about the late-2000s financial crisis. The film is about "the systemic corruption of the United States by the financial services industry and the consequences of that systemic corruption".'
  },
  {
    Id: '',
    Title: 'Citizenfour',
    Director: 'Laura Poitras',
    Genre: 'Documentary',
    Description: 'Citizenfour is a 2014 documentary film directed by Laura Poitras, concerning Edward Snowden and the NSA spying scandal.'
  },
  {
    Id: '',
    Title: 'Cowspiracy',
    Director: 'Kip Andersen',
    Genre: 'Documentary',
    Description: 'The Sustainability Secret is a groundbreaking feature-length environmental documentary following intrepid filmmaker Kip Andersen as he uncovers the most destructive industry facing the planet today – and investigates why the world\'s leading environmental organizations are too afraid to talk about it.'
  },
  {
    Id: '',
    Title: 'Icarus',
    Director: 'Bryan Fogel',
    Genre: 'Documentary',
    Description: 'Icarus is a 2017 American documentary film by Bryan Fogel, which chronicles Fogel\'s exploration of the option of doping to win an amateur cycling race and happening upon a major international doping scandal when he asks for the help of Grigory Rodchenkov, the head of the Russian anti-doping laboratory.'
  },
  {
    Id: '',
    Title: 'Our Planet',
    Director: 'Alastair Fothergill',
    Genre: 'Documentary',
    Description: 'Documentary series focusing on the breadth of the diversity of habitats around the world, from the remote Arctic wilderness and mysterious deep oceans to the vast landscapes of Africa and diverse jungles of South America.'
  },
  {
    Id: '',
    Title: 'Terra',
    Director: 'Michael Pitiot',
    Genre: 'Documentary',
    Description: 'Terra is a thought provoking and visually stunning documentary about Earth. It is "an ode to humanity" and a spectacular portrayal of the beauty of life. It also brings to light the struggles that we face as we stray further and further from the natural.'
  },
  {
    Id: '',
    Title: 'What the health',
    Director: 'Kip Andersen',
    Genre: 'Documentary',
    Description: 'What the Health is a 2017 documentary film which critiques the health impact of meat, fish, eggs and dairy products consumption, and questions the practices of leading health and pharmaceutical organizations. Its primary purpose is to advocate for a plant-based diet.'
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
app.get('/movies/:Title', (req, res) => {
  res.send('Successful GET request returning data on movie title: ' + req.params.title);
});

// Get the data about genres, by genre
app.get('/movies/genres/:Genre', (req, res) => {
  res.send('Successful GET request returning data on movie genre: ' + req.params.genre);
});

// Get the data about a director, by name
app.get('/movies/directors/:Director', (req, res) => {
  res.send('Successful GET request returning data on director: ' + req.params.name);
});

//Get a list of data about the All movies
app.get('/users', (req, res) => {
  res.json(users);
});

// POST requests
// Allow new users to register
app.post('/users', (req, res) => {
  res.send('Successful POST request registering new user');
});

// Post a new movie to the "list of favourites movie" of a user
app.post('/users/:User/movies/:Title', (req, res) => {
  res.send('Successful POST request adding the movie: ' + req.params.title + ' in "Favourite List" of ' + req.params.user);
});

// PUT requests
// Update the Info of a user, by userName
app.put('/users/:User', (req, res) => {
  res.send('Successful PUT request updating information for the user: ' + req.params.user);
});

// DELETE requests
// Deregister a user from the database, by name
app.delete('/users/:User', (req, res) => {
  res.send('Successful DELETE request removed the user ' + req.params.user + ' from the database');
});

// Deletes a movie from the "Favourite List", by name
app.delete('/users/:User/movies/:Title', (req, res) => {
  res.send('Successful DELETE request removed movie from the "Favourite List" of the user: ' + req.params.user);
});

// listen for requests
app.listen(8080, () =>
console.log('Your app is listening on port 8080.')
);
