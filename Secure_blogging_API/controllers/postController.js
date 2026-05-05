const Post = require('../models/Post');
const Comment = require('../models/Comment');

// @desc    Get all posts with comments
// @route   GET /api/v1/posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name').populate({
      path: 'comments',
      populate: { path: 'user', select: 'name' }
    }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single post with comments
// @route   GET /api/v1/posts/:id
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name').populate({
      path: 'comments',
      populate: { path: 'user', select: 'name' }
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create post (prevent duplicate title via unique index)
// @route   POST /api/v1/posts
exports.createPost = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const post = await Post.create(req.body);

    const populatedPost = await Post.findById(post._id).populate('user', 'name');
    
    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Post title already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update post (own post only)
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'User not authorized to update this post'
      });
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('user', 'name');

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Post title already exists'
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete post (own or admin)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (post.user.id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'User not authorized to delete this post'
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get trending posts (by comment count)
exports.getTrendingPosts = async (req, res) => {
  try {
    const trending = await Comment.aggregate([
      {
        $group: {
          _id: '$post',
          commentCount: { $sum: 1 }
        }
      },
      { $sort: { commentCount: -1 } },
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: '_id',
          as: 'post'
        }
      },
      { $unwind: '$post' },
      {
        $lookup: {
          from: 'users',
          localField: 'post.user',
          foreignField: '_id',
          as: 'post.user'
        }
      },
      { $unwind: '$post.user' },
      { $project: { 'post.user.password': 0 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      count: trending.length,
      data: trending.map(t => t.post)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
