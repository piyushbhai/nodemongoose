const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
  content: String,
});

module.exports = mongoose.model('Comment', commentSchema);
