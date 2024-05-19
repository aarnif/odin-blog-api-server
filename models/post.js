import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  author: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  isPublished: Boolean,
});

postSchema.virtual("url").get(function () {
  // Don't use an arrow function because of this
  return `api/posts/${this._id}`;
});

const Post = mongoose.model("Post", postSchema);

export default Post;
