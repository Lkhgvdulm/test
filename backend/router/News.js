const express = require("express");
const router = express.Router();
const news = require("../controller/News");

router.get("/api/news", news.getNews);
router.post("/api/news_create", news. createNews);
router.put("/api/new_update/:id", news.editNews);
router.delete("/api/news_delete/:id", news.deleteNews);

module.exports = router