const express = require("express");
const router = express.Router();
const workplace = require("../controller/Workplace");

router.get("/api/workplace", workplace.getWorkplace);
router.post("/api/workplace_create", workplace.createWorkplace);
router.put("/api/workplace_update/:id", workplace.editWorkplace);
router.delete("/api/workplace_delete/:id", workplace.deleteWorkplace);

module.exports = router