import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      maxlength: 60,
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      maxlength: 60,
    },
    userName: {
      type: String,
      Required: [true, "Please enter a user name"],
      trim: true,
      Unique: true
    },
    // accountType: {
    //   type: String,
    //   required: false,
    //   maxlength: 200,
    // },
    email: {
      type: String,
      required: true,
      match: [/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, "Please enter a valid email address"],
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    // img: {
    //   type: String,
    //   required: false,
    // },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
