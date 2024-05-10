const debug = require("debug")("mern:controllers:usersController");

function create(req, res) {
  // Baby step...
  res.json({
    user: {
      name: req.body.name,
      email: req.body.email,
    },
  });
  debug(req.body);
}

module.exports = {
  create,
};
