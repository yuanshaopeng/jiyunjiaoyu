const express= require("express");
const router = express.Router();
const admin_model = require("../modules/admin_model.js");
router.get("/shopGl",admin_model._shopGl);

module.exports = router;