const express = require("express");
const router = express.Router();
const job = require("../controller/Job");

router.get("api/job", job.getJob);
router.post("api/job_create", job.createJob);
router.put("api/job_update", job.editJob);
router.delete("api/job_delete/:id", job.deleteJob);