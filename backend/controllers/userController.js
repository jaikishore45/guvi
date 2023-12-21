const User = require("../model/user");
const bcrypt = require("bcrypt");
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await User.findById(id);

    res.status(201).json({
      res: response,
    });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const username = req.body.username;
  const bio = req.body.bio;
  
  const email = req.body.email;
  
  const age = req.body.age;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const mobile = req.body.mobile;
  const password = req.body.password;
  
 

  try {
    const response = await User.findByIdAndUpdate(id, {
      username, email, bio,age, gender, dob, mobile, password
    });

    res.status(201).json({
      res: response,
    });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

const updatePasswordUser = async (req, res) => {
  const id = req.params.id;

  const password = req.body.password;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    res.status(201).json({
      res: response,
    });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

module.exports = {
  getUserById,
  updateUser,
  updatePasswordUser,
};
