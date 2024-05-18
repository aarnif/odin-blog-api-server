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

// Virtual for user's URL
postSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `api/posts/${this._id}`;
});

const Post = mongoose.model("Post", postSchema);

export default Post;
