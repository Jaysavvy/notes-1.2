require("dotenv").config();
const http = require("http");

//Middleware
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Note = require("./module/note");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");
const notesRouter = require("./controllers/notes");

app.use(express.json());

app.use(cors());
app.use("/api/notes", notesRouter);
app.use(express.static("build"));

morgan.token("payload", function (req) {
  return JSON.stringify(req.body);
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
);

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// app.get("/api/notes", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

// app.get("/api/notes/:id", (request, response, next) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })

//     .catch((error) => next(error));
// });

// app.delete("/api/notes/:id", (request, response) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })

//     .catch((error) => error);
// });

// // const generateId = () => {
// //   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
// //   return maxId + 1;
// // };

// app.post("/api/notes", (request, response, next) => {
//   const body = request.body;

//   if (body.content === undefined) {
//     return response.status(400).json({ error: "content missing" });
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   });

//   note.save().then((savedNote) => {
//     response.json(savedNote);
//   });

//   // .catch(error => next(error))
// });

// app.put("/api/notes/:id", (request, response, next) => {
//   const { content, important } = request.body;

//   Note.findByIdAndUpdate(
//     request.params.id,
//     { content, important },
//     { new: true, runValidators: true, context: "query" }
//   )
//     .then((updatedNote) => {
//       response.json(updatedNote);
//     })
//     .catch((error) => next(error));
// });

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "malformatted id" });
//   } else if (error.name === "ValidationError") {
//     return response.status(400).json({ error: error.message });
//   }

//   next(error);
// };

// // this has to be the last loaded middleware.
// app.use(errorHandler);

module.exports= app;
