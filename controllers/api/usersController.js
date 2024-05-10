const debug = require("debug")("mern:controllers:usersController");
const User = require("../../models/user");

async function create(req, res) {
  // const { name, email, password } = req.body;
  // const user = await User.create({ name, email, password });
  // res.status(201).json({user});
  try {
    const user = await User.create(req.body);
    // Baby step...
    res.status(201).json(user);
    debug(req.body);
  } catch (err) {
    debug("error: %o", err);
    res.status(500).json(err);
  }
}

module.exports = {
  create,
};
