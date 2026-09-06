const catchAsync = require("../utils/catchAsync");
const noteService = require("../services/noteService");

function notifyUser(req, event, data) {
  const io = req.app.get("io");
  if (io) io.to(`user-${req.user.id}`).emit(event, data);
}

const list = catchAsync(async (req, res) => {
  const notes = await noteService.listNotes(req.user.id, req.query.search);
  res.json({ success: true, notes });
});

const getOne = catchAsync(async (req, res) => {
  const note = await noteService.getNote(req.user.id, req.params.id);
  res.json({ success: true, note });
});

const create = catchAsync(async (req, res) => {
  const note = await noteService.createNote(req.user.id, req.body);
  notifyUser(req, "note:created", note);
  res.status(201).json({ success: true, note });
});

const update = catchAsync(async (req, res) => {
  const note = await noteService.updateNote(req.user.id, req.params.id, req.body);
  notifyUser(req, "note:updated", note);
  res.json({ success: true, note });
});

const remove = catchAsync(async (req, res) => {
  await noteService.deleteNote(req.user.id, req.params.id);
  notifyUser(req, "note:deleted", { id: Number(req.params.id) });
  res.status(204).send();
});

const exportNotes = catchAsync(async (req, res) => {
  const notes = await noteService.listNotes(req.user.id);
  res.setHeader("Content-Disposition", "attachment; filename=notes-export.json");
  res.json(notes);
});


const importNotes = catchAsync(async (req, res) => {
  const { notes } = req.body;
  if (!Array.isArray(notes)) {
    return res.status(400).json({ success: false, message: "Expected an array of notes." });
  }
  const created = [];
  for (const n of notes) {
    if (n && n.title) {
      created.push(await noteService.createNote(req.user.id, n));
    }
  }
  res.status(201).json({ success: true, imported: created.length });
});
module.exports = { list, getOne, create, update, remove, exportNotes, importNotes };