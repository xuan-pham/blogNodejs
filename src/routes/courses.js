const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/CourseController");
//
router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.post("/handle-form-actions", courseController.handleFormAction);
router.post(
  "/handle-form-restore-forceDestroy",
  courseController.handleFormRestoreForceDestroy
);
router.get("/:id/edit", courseController.edit);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.destroy);
router.delete("/:id/force", courseController.forceDestroy);
router.patch("/:id/restore", courseController.restore);
router.get("/:slug", courseController.show);
//
module.exports = router;
