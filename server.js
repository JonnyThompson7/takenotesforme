const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Function to create routes
function createNewNote(body, notesArray) {
  const newNote = body;
  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return newNote;
}

// Function to Delete Notes
function deleteNoteById(id, notes) {
  const thisId = id;
  console.log(thisId);
  notes.splice(thisId, 1)
  for (i = 0; i < notes.length; i++) {
    notes[i].id = "" + i + "";
  }
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notes }, null, 2)
  );
  return notes;
}

// Routes for Get/Push/Delete/Listen
app.get('/api/notes', (req, res) => {
  let results = notes;
  res.json(results);
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Delete Notes Route - Extra Credit
app.delete('/api/notes/:id', (req, res) => {
  const result = deleteNoteById(req.params.id, notes);
  res.send(result);
});

// Console Log Port
app.listen(PORT, () => {
  console.log(`API server now on PORT ${PORT}!`);
});
