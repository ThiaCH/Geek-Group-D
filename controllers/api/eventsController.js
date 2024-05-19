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
  const { eventName, eventDate, urlLink, description } = req.body;
  const newEvent = new Event({
    eventName,
    eventDate,
    urlLink,
    description,
  });
  await newEvent.save();
  res.status(201).json({ message: "Event created", newEvent });
};

module.exports = {
  createEvent,
  getEvents,
  getOneEvent,
};
