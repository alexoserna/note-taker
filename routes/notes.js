const express = require('express');
const router = express.Router();
const fs = require('fs');

// Retrieves all notes
router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    console.log(data);
    return data;
  });
});

// Saves a new note
router.post('/', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = Date.now();
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

// Deletes a note
router.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id != req.params.id);
      fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ message: 'Note deleted' });
        }
      });
    }
  });
});

module.exports = router;
