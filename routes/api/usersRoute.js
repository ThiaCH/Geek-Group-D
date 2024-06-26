const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const eventsCtrl = require("../../controllers/api/eventsController");
const jwt = require("jsonwebtoken");
const debug = require("debug")("mern:routes:usersRoute");

// POST /api/users
router.post("/", usersCtrl.create);

router.get("/checkLoginId/:loginId", usersCtrl.checkLoginId);
router.post("/loginId", usersCtrl.createLoginId);
router.post("/login", usersCtrl.login);
router.post("/login/noatt", usersCtrl.loginNoAtt);

router.get("/attendance", usersCtrl.show);

router.post("/attendance", usersCtrl.createAttendance);

router.delete("/attendance/:id", usersCtrl.deleteOne);

router.put("/attendance/:id", usersCtrl.editOne);

router.get("/students/all", usersCtrl.listAllStudents);
router.patch("/student/:id/update", usersCtrl.updateStudent);

router.post("/classes", usersCtrl.showClasses);

router.get("/events/all", eventsCtrl.getEvents);
router.get("/events", eventsCtrl.showEventByClass);
router.get("/events/:id", eventsCtrl.getOneEvent);
router.post("/events", eventsCtrl.createEvent);
router.put("/events/:id", eventsCtrl.updateEvent);
router.delete("/events/:id", eventsCtrl.deleteEvent);

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

module.exports = router;
