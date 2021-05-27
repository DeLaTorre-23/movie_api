const port = process.env.PORT || 8080;
const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

// Integrate Mongoose into the REST API
const Models = require("./models/models.js");

// Import "passport.js” module into the project
const passport = require("passport");
require("./passport");

// Integrate CORS into the REST API
const cors = require("cors");

// Allow to export the Models
const Documentaries = Models.Documentary;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

// List of Allowed domains requests (allowed origins)
let allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:8080",
  "http://testsite.com",
  "http://localhost:1234",
];

/**
 * Function to use CORS with the allowed origins
 */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

/**
 * Middleware function
 */
app.use(bodyParser.json());

// Logging request to server
app.use(morgan("common"));

// Serving Static Files
app.use(express.static("public"));

// Error-Handling middleware function that will log all application-level errors to th terminal
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

/**
 * Connect mongoose with the database
 * optional with the local database
 */
/* Online Heroku DataBase */
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Local DataBase
// mongoose.connect('mongodb://localhost:27017/actualdoc', { useNewUrlParser: true, useUnifiedTopology: true });

// Listen for requests
app.listen(port, "0.0.0.0", () => {
  console.log("Your app is listening on port 8080.");
});

/**
 * Import “auth.js” (Authentication Login) into the project
 */
let auth = require("./auth")(app);

/*------ GET requests ------ */
/**
 * API endpoint to the homepage
 */
app.get("/", (req, res) => {
  res.send("Enjoy the thousands of documentaries on DOCumentality!");
});

/**
 * Get the Documentation file
 */
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

/**
 * API endpoint to get all documentaries
 */
app.get(
  "/documentaries",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Documentaries.find()
      .then((documentaries) => {
        res.status(201).json(documentaries);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * API endpoint to get a documentaries by title
 */
app.get(
  "/documentaries/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Documentaries.findOne({ Title: req.params.Title })
      .then((documentary) => {
        res.json(documentary);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * API call to return user details
 */
app.get(
  "/users",
  // passport.authenticate('jwt', { session: false }),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * API call to return user details by username
 */
app.get(
  "/users/:Username",
  // passport.authenticate('jwt', { session: false }),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * API call to return a  list of data about the All genres
 */
app.get(
  "/genres",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Genres.find()
      .then((genre) => {
        res.status(201).json(genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * API endpoint to get genre by name
 */
app.get(
  "/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Genres.findOne({ Name: req.params.Name })
      .then((genre) => {
        res.json(genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * API endpoint to get director list
 */
app.get(
  "/directors",
  /*passport.authenticate('jwt', { session: false }),*/
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Directors.find()
      .then((director) => {
        res.status(201).json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * API endpoint to get director by name
 */
app.get(
  "/directors/:Name",
  /*passport.authenticate('jwt', { session: false }),*/
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Directors.findOne({ Name: req.params.Name })
      .then((director) => {
        res.json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/*------ POST requests ------*/
/**
 * API call to create a new user
 *
 * We’ll expect JSON in this format
 * {
 *  ID: Integer,
 *  Username: String,
 *  Password: String,
 *  Email: String,
 *  Birthday: Date
 * }
 */
app.post(
  "/users",
  // Validation logic here for request
  // you can use a chain of methods like .not().isEmpty()
  // which means "opposite of isEmpty" in plain english "is not empty"
  // or use .isLength({min: 5}) which means
  // minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req); // Check the validation object for errors

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          // If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * API endpoint to add a documentary to the "Favorite List" of a user
 */
app.post("/users/:Username/Documentaries/:Title", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteList: req.params.Title },
    },
    { new: true }, // This line makes sure that the updated document is request
    (err, updateUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updateUser);
      }
    }
  );
});

/*------ PUT requests ------*/
/**
 * API endpoint to update user's information
 *
 * We’ll expect JSON in this format
 * {
 *  Username: String, (required)
 *  Password: String, (required)
 *  Email: String, (required)
 *  Birthday: Date
 * }
 */
app.put(
  "/users/:Username",
  // Validation logic
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req); // Check the validation object for errors

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }, // This line makes sure that the update document is returned
      (err, updateUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updateUser);
        }
      }
    );
  }
);

/*------  DELETE requests ------*/
// Deregister a user from the database, by username
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res
          .status(200)
          .send(
            "Successful DELETE request removed the user " +
              req.params.Username +
              " from the database."
          );
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
 * API endpoint to delete a documentary from the "Favorite List", by title
 */
app.delete("/users/:Username/Documentaries/:Title", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteList: req.params.Title } },
    { new: true }, // This line makes sure that the updated document is request
    (err, updateUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updateUser);
      }
    }
  );
});
