const express = require("express");
const router = express.Router();
const values = require("../controller/Values");

router.get("/api/values", values.getValues);
router.post("/api/values_create", values.createValues);
router.put("/api/values_update/:id", values.editValues);
router.delete("/api/values_delete/:id", values.deleteValues);

module.exports = router