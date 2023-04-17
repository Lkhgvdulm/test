const express = require("express");
const router = express.Router();
const goals = require("../controller/Goals")

router.get("/api/goals",goals.getGoals);
router.post("/api/goals_create", goals.createGoals);
router.put("/api/goals_update/:id",goals.editGoals);
router.delete("/api/goals_delete/:id",goals.deleteGoals)

module.exports = router