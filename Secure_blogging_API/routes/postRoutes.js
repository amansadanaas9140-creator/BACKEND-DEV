const express = require('express');
const { 
  getPosts, getPost, createPost, updatePost, deletePost, getTrendingPosts 
} = require('../controllers/postController');
const { verifyToken } = require('../middleware/auth');
const { postSchema, validate } = require('../middleware/validate');

const router = express.Router({ mergeParams: true });

router.use(verifyToken);

router.route('/').get(getPosts).post(validate(postSchema), createPost);
router.route('/trending').get(getTrendingPosts);
router.route('/:id')
  .get(getPost)
  .put(validate(postSchema), updatePost)
  .delete(deletePost);

module.exports = router;
