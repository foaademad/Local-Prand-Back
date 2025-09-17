const express = require("express");
const router = express.Router();    
const { createCategory, getAllCategories } = require("../controllers/catogryController");

router.post("/", createCategory);
router.get("/", getAllCategories);

module.exports = router;