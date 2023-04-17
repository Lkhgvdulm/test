const express = require("express");
const router = express.Router();
const resource = require('../controller/Resource');

router.get("/api/resource", resource.getResource);
router.post("/api/resource_create", resource.createResource);
router.put("/api/resource_update/:id", resource.editResource);
router.delete("/api/resource_delete/:id", resource.deleteResource);

module.exports = router