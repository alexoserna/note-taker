const express = require('express');
const router = express.Router();
const fs = require('fs');
const storage = require('../db/db.json');

// Retrieves all notes
router.get('/', (req, res) => {
  res.json(storage);
});

// Saves a new note
router.post('/', (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now();
  storage.push(newNote);
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile('./db/db.json', JSON.stringify(storage), (err) => {
        if (err) {
          console.log(err);
        } else {
          // Send the newly created note in the response
          res.json(newNote);

          // Make a GET request to retrieve the updated notes
          fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
              console.log(err);
            } else {
              const updatedNotes = JSON.parse(data);
              // Emit the updated notes to connected clients if needed
              // ...
            }
          });
        }
      });
    }
  });
});

// Deletes a note
router.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  const noteIndex = storage.findIndex((note) => note.id == noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  storage.splice(noteIndex, 1);

  fs.writeFile('./db/db.json', JSON.stringify(storage), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const updatedNotes = JSON.parse(data);
      res.json(updatedNotes);
    });
  });
});

module.exports = router;
