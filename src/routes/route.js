const express = require('express');
const router = express.Router();
const Controllers = require("../controllers/commonControllers")
const middleWare = require("../middleware/commonMiddleware")

router.post("/functionup/interns",Controllers.createIntern)

module.exports = router;