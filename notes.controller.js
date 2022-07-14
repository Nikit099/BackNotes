const fs = require("fs/promises");
const path = require("path");
const notesPath = path.join(__dirname, "db.json");
const chalk = require("chalk");
async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.blue("Here is the list of notes"));
  notes.forEach((note) => {
    console.log(chalk.red(note.id, note.title));
  });
}
async function removeNote(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
}
async function editNote(id, title) {
  const notes = await getNotes();
  notes[notes.findIndex((i) => i.id === id)].title = title;
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  editNote,
};
