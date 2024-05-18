import express from "express";
import apiController from "../controllers/apiController.js";
const router = express.Router();

router.get("/", apiController.index);

router.get("/user", apiController.user);

router.post("/login", apiController.login);

router.get("/logout", apiController.logout);

router.get("/posts", apiController.getAllPosts);

router.post("/posts", apiController.addNewPost);

router.get("/posts/:postId", apiController.getPostByIdGet);

router.post("/posts/:postId", apiController.getPostByIdPost);

router.put("/posts/:postId", apiController.getPostByIdUpdate);

router.delete("/posts/:postId", apiController.getPostByIdDelete);

router.get("/posts/:postId/comments", apiController.getAllComments);

router.post("/posts/:postId/comments", apiController.addNewComment);

router.get(
  "/posts/:postId/comments/:commentId",
  apiController.getCommentByIdGet
);

router.post(
  "/posts/:postId/comments/:commentId",
  apiController.getCommentByIdPost
);

router.put(
  "/posts/:postId/comments/:commentId",
  apiController.getCommentByIdUpdate
);

router.delete(
  "/posts/:postId/comments/:commentId",
  apiController.getCommentByIdDelete
);

export default router;
