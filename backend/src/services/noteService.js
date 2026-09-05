const { Op } = require("sequelize");
const { Note } = require("../models");
const ApiError = require("../utils/ApiError");

async function listNotes(userId, search) {
  const where = { userId };
  if (search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { content: { [Op.like]: `%${search}%` } },
    ];
  }
  return Note.findAll({ where, order: [["updatedAt", "DESC"]] });
}

async function getNote(userId, id) {
  const note = await Note.findOne({ where: { id, userId } });
  if (!note) throw new ApiError(404, "Note not found.");
  return note;
}

async function createNote(userId, { title, content }) {
  if (!title) throw new ApiError(400, "Title is required.");
  return Note.create({ title, content: content || "", userId });
}

async function updateNote(userId, id, { title, content }) {
  const note = await getNote(userId, id);
  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;
  await note.save();
  return note;
}

async function deleteNote(userId, id) {
  const note = await getNote(userId, id);
  await note.destroy();
}

module.exports = { listNotes, getNote, createNote, updateNote, deleteNote };