const Comment = require('../models/Comment');
const Post = require('../models/Post');

// @desc    Add comment to post
// @route   POST /api/v1/posts/:postId/comments
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const comment = await Comment.create({
      comment: req.body.comment,
      post: req.params.postId,
      user: req.user.id
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name')
      .populate('post', 'title');

    res.status(201).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
