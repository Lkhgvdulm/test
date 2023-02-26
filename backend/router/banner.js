const express = require("express");
const router = express.Router();
const banner = require("../controller/Banner");

router.get("/api/banner",banner.getBanner);
router.post("/api/banner_create",banner.createBanner);
router.put("/api/banner_update/:id",banner.editBanner);
router.delete("/api/banner_delete/:id",banner.deleteBanner)

module.exports = router