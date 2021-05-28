const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Defines database schema for all documentaries to follow
 */
let documentarySchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
    DateOfBirth: Date,
    DateOfDeath: Date,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

/**
 * Defines database schema for all users to follow
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Documentary" }],
});

/**
 * Hashes password so an encrypted password is stored in the database
 * @param {string} password
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Compares hashed password in database with password user enters on login for authentication
 * @param {string} password
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

/**
 * Defines database schema for genres
 */
let genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});

/**
 * Defines database schema for directors
 */
let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: String,
  DateOfBirth: Date,
  DateOfDeath: Date,
});

/**
 * Defines database schema for Documentaries
 */
let Documentary = mongoose.model("Documentary", documentarySchema);
let User = mongoose.model("User", userSchema);
let Genre = mongoose.model("Genre", genreSchema);
let Director = mongoose.model("Director", directorSchema);

module.exports.Documentary = Documentary;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
