const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//create a comment
router.post("/",withAuth, async (req, res) => {
  console.log("create comment")
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newComment)
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete a comment
router.delete("/:id",withAuth, async (req, res) => {
  try {
    const postComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postComment) {
      res.status(404).json({ message: "No comment found with this id!" });
      return; 
    } 
     
    res.status(200).json(postComment);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;