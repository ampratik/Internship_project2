const express = require('express');
const router = express.Router();
const Controllers = require("../controllers/commonControllers")

//--Create Intern
router.post("/functionup/interns",Controllers.createIntern)

//--Create College
router.post("/functionup/colleges",Controllers.createCollege)

//--Details
router.get("/functionup/collegeDetails",Controllers.collegeDetails)

module.exports = router;