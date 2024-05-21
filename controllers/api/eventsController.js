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

const updateEvent = async (req, res) => {
  try {
    const resource = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!resource) {
      return res.status(404).send({ message: "Event not found" });
    }
    res.send(resource);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).send({ message: "Event not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createEvent,
  getEvents,
  getOneEvent,
  showEventByClass,
  updateEvent,
  deleteEvent,
};
