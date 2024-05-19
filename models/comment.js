import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

commentSchema.virtual("url").get(function () {
  // Don't use an arrow function because of this
  return `/api/posts/:postId/comments/${this._id}`;
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
