const userModel = require("../../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports.createUser = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const user = await userModel.create(req.body);
    res.status(200).json({ message: "User is created.", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.createSession = async (req, res) => {
  try {
    console.log(req.body)
    const user = await userModel.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(422).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Logged In.Token is Generated.",
      data: {
        token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '2m' }),
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
