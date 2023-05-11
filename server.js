const express = require('express');
const path = require('path');
// const { clog } = require('./middleware/clog');
const api = require('./public/assets/js/index');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
  // code to retrieve notes from the database
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.post('/api/notes', (req, res) => {
  // code to save a new note to the database
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});