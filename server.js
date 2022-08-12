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

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();
  const newNote = createNewNote(req.body, notes);
  res.json(newNotes);
})

app.listen(PORT, () => {
  console.log(`API server now on PORT ${PORT}!`);
});
