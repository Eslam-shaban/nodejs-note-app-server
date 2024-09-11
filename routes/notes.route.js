import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

// authentication
router.use(requireAuth)

router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);
export default router;

//   // first way
// router.get("/", (req, res) => {
//   res.send("get all notes");
// });
// router.get("/:id", (req, res) => {
//   res.send("get single note");
// });
// router.post("/", (req, res) => {
//   res.send("create new note");
// });
// router.put("/:id", (req, res) => {
//   res.send("update note");
// });
// router.delete("/:id", (req, res) => {
//   res.send("delete note");
// });
