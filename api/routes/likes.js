const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes");

router.get("/", LikesController.getAllLikes);
router.post("/", LikesController.createLike);
router.delete("/", LikesController.deleteLike);

module.exports = router;