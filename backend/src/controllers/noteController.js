const catchAsync = require("../utils/catchAsync");
const noteService = require("../services/noteService");

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
  res.status(201).json({ success: true, note });
});

const update = catchAsync(async (req, res) => {
  const note = await noteService.updateNote(req.user.id, req.params.id, req.body);
  res.json({ success: true, note });
});

const remove = catchAsync(async (req, res) => {
  await noteService.deleteNote(req.user.id, req.params.id);
  res.status(204).send();
});

module.exports = { list, getOne, create, update, remove };