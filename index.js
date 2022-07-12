// const yargs = require("yargs");
// const { addNote, printNotes, removeNote } = require("./notes.controller.js");
// yargs.command({
//   command: "add",
//   describe: "Add new note to list",
//   builder: {
//     title: {
//       type: "string",
//       describe: "Note title",
//       demandOption: true,
//     },
//   },
//   handler({ title }) {
//     addNote(title);
//   },
// });

// yargs.command({
//   command: "list",
//   describe: "Print all notes",

//   handler() {
//     printNotes();
//   },
// });

// yargs.command({
//   command: "remove",
//   describe: "Remove note by id",

//   handler({ id }) {
//     removeNote(String(id));
//   },
// });

// yargs.parse();

// const os = require("os");
// console.log(os.uptime());

const chalk = require("chalk");

const express = require("express");
const {
  addNote,
  getNotes,
  removeNote,
  editNote,
} = require("./notes.controller.js");
const path = require("path");

const app = express();
const port = 3000;
app.use(express.static(path.resolve(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});
app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
app.put("/:id", async (req, res) => {
  editNote(req.body);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
app.listen(port, () => {
  console.log(chalk.yellow(`server has been started on port ${port}...`));
});
