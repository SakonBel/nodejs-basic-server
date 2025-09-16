const express = require("express");

const postsCont = require("./../controllers/postsController");

// Create router
const router = express.Router();

router.param("id", postsCont.checkID);

// Routes
router
  .route("/")
  .get(postsCont.getAllPosts)
  .post(postsCont.checkBody, postsCont.addPost);
router
  .route("/:id")
  .get(postsCont.getSinglePost)
  .patch(postsCont.modifyPost)
  .delete(postsCont.deletePost);

module.exports = router;
