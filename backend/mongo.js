const mongoose = require("mongoose");
require("dotenv").config();

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

const password = process.argv[2];

const url = process.env.Mongo_DB1;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Learning the basics of CSS",
  important: false,
});

Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
