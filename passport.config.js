import passport from "passport";
import Strategy from "passport-local";
import bcrypt from "bcryptjs";
import User from "./models/user.js";

const LocalStrategy = Strategy.Strategy;

const passportConfig = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log("Try logging in...");
      try {
        const user = await User.findOne({ userName: username });
        if (!user) {
          console.log("Incorrect username!");
          return done(null, false, { message: "Incorrect username!" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          console.log("Incorrect password!");
          return done(null, false, { message: "Incorrect password!" });
        }
        console.log("Logging succesfull!");
        return done(null, user, { message: "Logging succesfull!" });
      } catch (err) {
        console.log("Logging unsuccesfull");
        console.log(err);
        return done(err);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default passportConfig;
