const express = require("express");
const noteController = require("../controllers/noteController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.use(authenticate);

router.get("/export", noteController.exportNotes);
router.post("/import", noteController.importNotes);

router.get("/", noteController.list);
router.post("/", noteController.create);
router.get("/:id", noteController.getOne);
router.put("/:id", noteController.update);
router.delete("/:id", noteController.remove);

module.exports = router;