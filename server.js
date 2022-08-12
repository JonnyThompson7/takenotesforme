const express = require('express');
const { notes } = require('./Develop/db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, notesArray) {
  const newNote = body;
  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return newNote;
}

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
  res.json(newNotes);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on PORT ${PORT}!`);
});
