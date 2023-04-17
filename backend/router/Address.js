const express = require("express");
const router = express.Router();
const address = require("../controller/Address");


router.get("/api/address", address.getAddress);
router.post("/api/addrees", address.createAddress);
router.put("/api/address_update", address.editAddress);
router.delete("/api/address_delete/:id", address.deleteAddress);

module.exports = router