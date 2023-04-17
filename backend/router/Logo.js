const express = require("express");
const router = express.Router();
const logo = require("../controller/Logo");

router.get("/api/logo", logo.getLogo);
router.post("/api/logo_create", logo.createLogo);
router.put("/api/logo_update/:id", logo.editLogo);
router.delete("/api/logo_delete/:id", logo.deleteLogo);

module.exports = router