const yargs = require("yargs");
const {
  addNote,
  printNotes,
  removeNote,
  editNote,
} = require("./notes.controller.js");
yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",

  handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",

  handler({ id }) {
    removeNote(String(id));
  },
});
yargs.command({
  command: "edit",
  describe: "Edit note by id",

  handler({ id, title }) {
    editNote(String(id), title);
  },
});
yargs.parse();
