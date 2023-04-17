const express = require("express");
const router = express.Router();
const about = require("../controller/About");

router.get("/api/about", about.getAbout);
router.post("/api/about_create", about.createAbout);
router.put("/api/about_update/:id", about.editAbout);
router.delete("/api/about_delete/:id", about.deleteAbout);

module.exports = router