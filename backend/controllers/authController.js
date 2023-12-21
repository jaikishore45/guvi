const User = require("../model/user");
const jwt = require("jsonwebtoken");

//token generation
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.signin(email, password);

    const token = createToken(user._id);

    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const bio = req.body.bio;
  const age = req.body.age;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const mobile = req.body.mobile;
  const password = req.body.password;
  
  try {
    const user = await User.signup(username, email, bio,age, gender, dob, mobile, password);
    const token = createToken(user._id);
    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
};
