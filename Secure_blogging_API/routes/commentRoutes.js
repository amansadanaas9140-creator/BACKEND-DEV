const express = require('express');
const { addComment } = require('../controllers/commentController');
const { verifyToken } = require('../middleware/auth');
const { commentSchema, validate } = require('../middleware/validate');

const router = express.Router({ mergeParams: true });

router.use(verifyToken);
router.post('/', validate(commentSchema), addComment);

module.exports = router;
