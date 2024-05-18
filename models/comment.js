import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Virtual for user's URL
commentSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/posts/:postId/comments/${this._id}`;
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
