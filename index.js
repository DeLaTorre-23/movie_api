const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

const app = express();

const mongoose = require('mongoose');
const Models = require('./models/models.js');

const Documentaries = Models.Documentary;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/actualdoc', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware function
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

// Error-Handling middleware function that will log all application-level errors to th terminal
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});

// GET requests
// Returns a default textual response
app.get('/', (req, res) => {
  res.send('Enjoy the thousands of documentaries on DOCumentality!');
});

//Get the Documentation file
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

//Get a list of data about the All documentaries
app.get('/documentaries', (req, res) => {
  res.json(documentaries);
});

// Get the data about a single documentary, by title
app.get('/documentaries/:title', (req, res) => {
  res.send('Successful GET request returning data on documentary title: ' + req.params.title);
});

// Get the data about genres, by genre
app.get('/documentaries/genres/:genre', (req, res) => {
  res.send('Successful GET request returning data on documentary genre: ' + req.params.genre);
});

// Get the data about a director, by name
app.get('/documentaries/directors/:director', (req, res) => {
  res.send('Successful GET request returning data on director: ' + req.params.director);
});

//Get a list of data about the All users
app.get('/users', (req, res) => {
  users.find()
    .then(users =>  {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Get a users by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) =>  {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST requests
// Allow new users to register
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Post a new movie to the "list of favourites movie" of a user
app.post('/users/:user/documentaries/:title', (req, res) => {
  res.send('Successful POST request adding the documentary: ' + req.params.title + ' in "Favourite List" of ' + req.params.user);
});

// PUT requests
// Update the Info of a user, by userName
app.put('/users/:user', (req, res) => {
  res.send('Successful PUT request updating information for the user: ' + req.params.user);
});

// DELETE requests
// Deregister a user from the database, by name
app.delete('/users/:user', (req, res) => {
  res.send('Successful DELETE request removed the user ' + req.params.user + ' from the database');
});

// Deletes a movie from the "Favourite List", by name
app.delete('/users/:user/documentaries/:title', (req, res) => {
  res.send('Successful DELETE request removed documentary from the "Favourite List" of the user: ' + req.params.user);
});

// listen for requests
app.listen(8080, () =>
console.log('Your app is listening on port 8080.')
);
