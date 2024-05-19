const Event = require("../../models/event");

const getEvents = async (req, res) => {
  const events = await Event.find({});
  res.json(events);
};

const getOneEvent = async (req, res) => {
  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  res.json(event);
};

const createEvent = async (req, res) => {
  const { eventName, eventDate, urlLink, description, classes } = req.body;
  const newEvent = new Event({
    eventName,
    eventDate,
    urlLink,
    description,
    classes,
  });
  await newEvent.save();
  res.status(201).json({ message: "Event created", newEvent });
};

const showEventByClass = async (req, res) => {
  const { class: className } = req.query;
  let events;
  if (className) {
    events = await Event.find({ classes: className }).populate(
      "classes",
      "className",
    );
  } else {
    events = await Event.find().populate("classes", "className");
  }
  res.json(events);
};

module.exports = {
  createEvent,
  getEvents,
  getOneEvent,
  showEventByClass,
};
