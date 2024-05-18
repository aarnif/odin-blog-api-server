import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/user.js";
import Post from "./models/post.js";
import Comment from "./models/comment.js";
import bcrypt from "bcryptjs";

const posts = [];
const comments = [];

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const createUser = async (index, userName, password) => {
  const userDetails = {
    userName: userName,
    password: password,
  };

  userDetails.password = await hashPassword(userDetails.password);

  const user = new User(userDetails);
  await user.save();
  console.log(`Added user: ${userName}`);
};

const createPost = async (
  index,
  title,
  author,
  content,
  comments,
  isPublished
) => {
  const postDetails = {
    title: title,
    author: author,
    content: content,
    comments: comments,
    isPublished: isPublished,
  };
  const post = new Post(postDetails);
  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
};

const createComment = async (index, title, author, content) => {
  const commentDetails = {
    title: title,
    author: author,
    content: content,
  };
  const comment = new Comment(commentDetails);
  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${title}`);
};

const createUsers = async () => {
  console.log("Creating Users");

  await Promise.all([createUser(0, "aarnif", "1234")]);
};

const createPosts = async () => {
  console.log("Creating Posts");

  await Promise.all([
    createPost(0, "First Post", "John Doe", "This is the first post", [], true),
    createPost(
      1,
      "Second Post",
      "Jane Doe",
      "This is the second post",
      [comments[0], comments[1]],
      true
    ),
    createPost(
      2,
      "Third Post",
      "John Doe",
      "This is the third post",
      [comments[0], comments[1]],
      true
    ),
    createPost(
      3,
      "Fourth Post",
      "Jane Doe",
      "This is the fourth post",
      [comments[0], comments[1]],
      true
    ),
    createPost(
      4,
      "Fifth Post",
      "John Doe",
      // Add lots of text to test the pagination
      "This is the fifth post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl quis. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl quis. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl quis. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl quis. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl quis. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl quis. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl quis. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl quis.",
      [],
      true
    ),
  ]);
};

const createComments = async () => {
  console.log("Creating Comments");

  await Promise.all([
    createComment(0, "First Comment", "John Doe", "This is the first comment"),
    createComment(
      1,
      "Second Comment",
      "Jane Doe",
      "This is the second comment"
    ),
    createComment(2, "Third Comment", "John Doe", "This is the third comment"),
    createComment(
      3,
      "Fourth Comment",
      "Jane Doe",
      "This is the fourth comment"
    ),
  ]);
};

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.byjz9pz.mongodb.net/posts?retryWrites=true&w=majority`;
const main = async () => {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  const connection = mongoose.connection;
  mongoose.connection.db.dropDatabase(
    console.log(`${connection.db.databaseName} database dropped.`)
  );
  await createUsers();
  await createComments();
  await createPosts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
};

main().catch((err) => console.log(err));
