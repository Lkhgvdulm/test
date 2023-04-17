const express = require("express");
const router = express.Router();
const time = require("../controller/Time");

router.get("/api/time", time.getTime);
router.post("/api/time_create", time.createTime);
router.put("/api/time_update/:id", time.editTime);
router.delete("/api/time_delete/:id", time.deleteTime);

module.exports = router