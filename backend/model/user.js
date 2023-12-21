const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
});

UserSchema.statics.signup = async function (username, email, bio,age,gender,dob,mobile, password) {
  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw Error("User Already Exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      username,
      email,
      bio,
      age,
      gender,
      dob,
      mobile,
      password: hashedPassword,
    });

    return user;
  }
};

UserSchema.statics.signin = async function (email, password) {
  const existingUser = await this.findOne({
    email,
  });

  if (!existingUser) {
    throw Error("User Not Exists");
  }

  const match = await bcrypt.compare(password, existingUser.password);

  if (match) {
    return existingUser;
  } else {
    throw Error("Check Password and Try Again");
  }
};

module.exports = mongoose.model("user", UserSchema);
