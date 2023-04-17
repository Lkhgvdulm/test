const express = require("express");
const router = express.Router();
const director = require("../controller/Director");

router.get("/api/director", director.getDirector);
router.post("/api/director_create", director.createDirector);
router.put("/api/director_update/:id", director.editDirector);
router.delete("/api/director_delete/:id", director.deleteDirector);

module.exports = router