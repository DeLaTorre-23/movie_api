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








// no touch

//
//
// const http = require('http'),
// url = require('url');
//
// http.createServer((request, resposnse) => {
//   let requestURL = url.parse(request.url, true);
//   if (request.URL.pathname = '/documentation.html') {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Documentation on the bookclub API.\n');
//   } else {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Welcome to my book club!\n');
//   }
// }).listen(8080);
//
// console.log('My first Node test server is running on Port 8080.');
//
//


// no touch
//
//
//
// const express = require('express'),
//   morgan = require('morgan'),
//   app = express();
//
// let topBooks = [
//   {
//     title: 'Harry Potter and the Sorcerer\'s Stone',
//     author: 'J.K. Rowling'
//   },
//   {
//     title: 'Lord of the Rings',
//     author: 'J.R.R. Tolkien'
//   },
//   {
//     title: 'Twilight',
//     author: 'Stephanie Meyer'
//   }
// ];
//
//
// app.use(morgan('common'));
//
// app.get('/', (req, res) => {
//   res.send('Welcome to my app!');
// });
//
// app.get('/secreturl', (req, res) => {
//   res.send('This is a secret url with super top-secret content.');
// });
//
// app.get('/books', (req, res) => {
//   res.json(topBooks);
// });
//
// app.listen(8080, () => {
//   console.log('Your app is listening on port 8080.');
// });
