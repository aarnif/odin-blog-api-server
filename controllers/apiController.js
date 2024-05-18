import asyncHandler from "express-async-handler";
import passport from "passport";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

const index = (req, res) => {
  res.send("Welcome to the Blog API!\n");
};

const user = asyncHandler(async (req, res) => {
  res.json({
    username: res.locals.user?.userName,
    password: res.locals.user?.password,
  });
});

const login = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (!user) res.status(404).send(info);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).send(req.user);
      });
    }
  })(req, res, next);
});

const logout = asyncHandler(async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("Logged out!");
    res.status(200).send("Logged out!");
  });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find({}).populate("comments").exec();
  res.json(allPosts);
});

const addNewPost = asyncHandler(async (req, res) => {
  const postDetail = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    comments: [],
    isPublished: req.body.isPublished,
  };

  const newPost = new Post(postDetail);
  const savedPost = await newPost.save();
  res.json(savedPost);
});

const getPostByIdGet = asyncHandler(async (req, res) => {
  const postById = await Post.findById(req.params.postId)
    .populate("comments")
    .exec();
  res.json(postById);
});

const getPostByIdPost = asyncHandler(async (req, res) => {
  res.send("Not implemented!\n");
});

const getPostByIdUpdate = asyncHandler(async (req, res) => {
  const postDetail = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    updatedAt: Date.now(),
    isPublished: req.body.isPublished,
  };

  console.log(postDetail);

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    postDetail,
    { new: true }
  );
  res.json(updatedPost);
});

const getPostByIdDelete = asyncHandler(async (req, res) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.postId)
    .populate("comments")
    .exec();
  const deletedPostComments = await Comment.deleteMany({
    _id: { $in: deletedPost.comments },
  });
  res.json({ deletedPost });
});

const getAllComments = asyncHandler(async (req, res) => {
  const postByIdWithComments = await Post.findById(req.params.postId)
    .populate("comments")
    .exec();
  res.json(postByIdWithComments.comments);
});

const addNewComment = asyncHandler(async (req, res) => {
  const commentDetail = {
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
  };

  const newComment = new Comment(commentDetail);
  const savedComment = await newComment.save();
  const updatePost = await Post.findByIdAndUpdate(req.params.postId, {
    $push: { comments: savedComment._id },
  });
  res.json(savedComment);
});

const getCommentByIdGet = asyncHandler(async (req, res) => {
  const postById = await Post.findById(req.params.postId)
    .populate("comments")
    .exec();
  const commentById = postById.comments.filter(
    (comment) => comment._id == req.params.commentId
  );
  res.json(commentById);
});

const getCommentByIdPost = asyncHandler(async (req, res) => {
  res.send("Not implemented!\n");
});

const getCommentByIdUpdate = asyncHandler(async (req, res) => {
  const updatedCommentDetail = {
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    updatedAt: Date.now(),
  };

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    updatedCommentDetail,
    { new: true }
  );
  res.json(updatedComment);
});

const getCommentByIdDelete = asyncHandler(async (req, res) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
  const updatePost = await Post.findByIdAndUpdate(req.params.postId, {
    $pull: { comments: deletedComment._id },
  });
  res.json({ deletedComment });
});

export default {
  index,
  user,
  login,
  logout,
  addNewPost,
  getAllPosts,
  getPostByIdGet,
  getPostByIdPost,
  getPostByIdUpdate,
  getPostByIdDelete,
  getAllComments,
  addNewComment,
  getCommentByIdGet,
  getCommentByIdPost,
  getCommentByIdUpdate,
  getCommentByIdDelete,
};
