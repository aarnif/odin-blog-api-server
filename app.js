import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";

import { passportConfig } from "./passport.config.js";

passportConfig(passport);

const app = express();

const PORT = process.env.PORT;

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.byjz9pz.mongodb.net/posts?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user ? req.user : undefined;
  next();
});

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, console.log(`Listening on port ${PORT}`));
