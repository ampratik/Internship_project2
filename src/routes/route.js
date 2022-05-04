const express = require('express');
const router = express.Router();
const Controllers = require("../controllers/commonControllers")
//const middleWare = require("../middleware/commonMiddleware")

router.post("/functionup/interns",Controllers.createIntern)

router.post("/functionup/colleges",Controllers.createCollege)

router.get("/functionup/collegeDetails",Controllers.getDetails)

module.exports = router;