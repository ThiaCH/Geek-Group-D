const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const jwt = require("jsonwebtoken");
const debug = require("debug")("mern:routes:usersRoute");
const eventsCtrl = require("../../controllers/api/eventsController");

// POST /api/users
router.post("/", usersCtrl.create);
router.get("/students/all", usersCtrl.listAllStudents);

router.get("/students/all", usersCtrl.listAllStudents);

router.post("/login", usersCtrl.login);

router.post("/attendance", usersCtrl.show);

router.delete("/attendance/:id", usersCtrl.deleteOne);

router.put("/attendance/:id", usersCtrl.editOne);

router.post("/classes", usersCtrl.showClasses);

router.get("/events", eventsCtrl.showEventByClass);
router.get("/events/:id", eventsCtrl.getOneEvent);
router.post("/events", eventsCtrl.createEvent);

const checkToken = (req, res, next) => {
  const header = req.get("Authorization");
  const token = header.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.SECRET);
    debug(payload.user);
    res.locals.user = payload.user;
    next();
  } catch (error) {
    res.status(401).json("Unauthorized");
  }
};

router.get("/check-token", [checkToken], (req, res) => {
  const user = res.locals.user;
  res.json(user);
});

router.patch("/student/:id/update", usersCtrl.updateStudent);

module.exports = router;
