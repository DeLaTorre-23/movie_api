const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

//Integrate Mongoose into the REST API
const Models = require('./models/models.js');

//Import "passport.js” module into the project
const passport = require('passport');
require('./passport');

//Allow to export the Models
const Documentaries = Models.Documentary;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/actualdoc', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware function
app.use(bodyParser.json());

//Import “auth.js” (Authentication Login) into the project
let auth = require('./auth')(app);

//log request to server
app.use(morgan('common'));
app.use(express.static('public'));

// GET requests
// Returns a default text response when at /
app.get('/', (req, res) => {
  res.send('Enjoy the thousands of documentaries on DOCumentality!');
});

//Get the Documentation file
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

//Get a list of data about the All documentaries at /documentaries
app.get('/documentaries', passport.authenticate('jwt', { session: false }), (req, res) => {
  Documentaries.find()
    .then((documentaries) => {
      res.status(201).json(documentaries);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get the data about a single documentary, by title
app.get('/documentaries/:Title', (req, res) => {
  Documentaries.findOne({ Title: req.params.Title })
  .then((documentary) => {
    res.json(documentary);
  })
  .catch ((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get a list of data about the All users
app.get('/users', function (req, res) {
  Users.find()
  .then(function (users)  {
    res.status(201).json(users);
  })
  .catch(function (err) {
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

//Get a list of data about the All genres
app.get('/genres', function (req, res) {
  Genres.find()
  .then(function (genre)  {
    res.status(201).json(genre);
  })
  .catch(function (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Get the data about genres, by name
app.get('/genres/:Name', (req, res) => {
  Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
    res.json(genre);
  })
  .catch ((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get a list of data about the All directors
app.get('/directors', function (req, res) {
  Directors.find()
  .then(function (director)  {
    res.status(201).json(director);
  })
  .catch(function (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Get the data about a director, by name
app.get('/directors/:Name', (req, res) => {
  Directors.findOne({ Name: req.params.Name })
  .then((director) => {
    res.json(director);
  })
  .catch ((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});



// PUT requests
// Update the Info of a user, by userName
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true}, //This line makes sure that the update document is returned
  (err, updateUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updateUser);
    }
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
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Post a new documentary to the "Favourites List" of a user
app.post('/users/:Username/Documentaries/:Title', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteList: req.params.Title },
  },
  { new: true }, //This line makes sure that the updated document is request
  (err, updateUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updateUser);
    }
  });
});


// DELETE requests
// Deregister a user from the database, by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.Username + ' was not found');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Deletes a documentary from the "Favourite List", by title
app.delete('/users/:Username/Documentaries/:Title', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteList: req.params.Title } },
    { new: true }, //This line makes sure that the updated document is request
    (err, updateUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updateUser);
      }
    }
  );
});

// Error-Handling middleware function that will log all application-level errors to th terminal
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});

// listen for requests
app.listen(8080, () =>
console.log('Your app is listening on port 8080.')
);
