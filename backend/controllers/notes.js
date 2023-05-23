
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");



notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
});

notesRouter.get("/:id", async (request, response, next) => {
  const notes = await Note.findById(request.params.id)
    .then((notes) => {
      if (notes) {
        response.json(notes);
      } else {
        response.status(404).end();
      }
    })
});

notesRouter.post("/", async (request, response, next) => {
  
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
});

notesRouter.delete("/:id", async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;

