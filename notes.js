const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...';

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json').toString();
    return JSON.parse(dataBuffer);
  } catch (err) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);

  if (notes.length > newNotes.length) {
    console.log(chalk.green.inverse('Note Removed!'));
    saveNotes(newNotes);
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};

const listNotes = () => {
  console.log(chalk.inverse('Your Notes!'));
  const notes = loadNotes();
  notes.forEach(note => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote,
};
