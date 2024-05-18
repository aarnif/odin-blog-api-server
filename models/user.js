import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  userName: { type: Schema.Types.String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
