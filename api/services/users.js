const User = require("../models/user");
const bcrypt = require("bcrypt");

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json("user_not_found");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ADD (CREATE)
exports.add = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      firstname: req.body.firstname,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      firstname: req.body.firstname,
      email: req.body.email,
    };

    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json("user_not_found");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0)
      return res.status(404).json("user_not_found");
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
};
