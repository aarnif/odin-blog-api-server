import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";
import errorHandler from "./errorHandler.js";
import config from "./utils/config.js";
import passportConfig from "./passport.config.js";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import morgan from "morgan";

passportConfig(passport);

const app = express();

mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0.byjz9pz.mongodb.net/posts?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(morgan("dev"));
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
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser(config.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user ? req.user : undefined;
  next();
});

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
