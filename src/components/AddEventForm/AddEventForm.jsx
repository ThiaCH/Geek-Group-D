import { useState } from "react";

export default function AddEventForm({classes, events, addEvent, editEvent, deleteEvent}) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      eventName,
      eventDate,
      urlLink,
      description,
      classes: selectedClasses,
    };
    editingEventId ? await editEvent(editingEventId, newEvent) : await addEvent(newEvent);
    setEventName("");
    setEventDate("");
    setUrlLink("");
    setDescription("");
    setSelectedClasses([]);
    setEditingEventId(null);
  };

  const handleClassChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedClasses(selectedOptions);
  };

  const handleEdit = (event) => {
    setEventName(event.eventName);
    setEventDate(event.eventDate);
    setUrlLink(event.urlLink);
    setDescription(event.description);
    setSelectedClasses(event.classes.map((cls) => cls._id));
    setEditingEventId(event._id);
  };

  return (
    <>
      {/* Add/Edit Upcoming Event Form */}
      <div className="add-event-container">
        <form onSubmit={handleSubmit}>
          <label>Event Name:</label>
          <input
            id="event-name"
            type="text"
            name="eventname"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
          />
          <label>Event Date:</label>
          <input
            id="event-date"
            type="datetime-local"
            name="eventdate"
            value={eventDate}
            onChange={(event) => setEventDate(event.target.value)}
          />
          <label>URL Link (if applicable):</label>
          <input
            id="url-link"
            type="url"
            name="urllink"
            value={urlLink}
            onChange={(event) => setUrlLink(event.target.value)}
          />
          <label>Description:</label>
          <textarea
            id="description"
            name="description"
            rows="10"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <label>Class:</label>
          <select
            id="class"
            name="class"
            multiple
            value={selectedClasses}
            onChange={handleClassChange}
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>
          <button type="submit">
            {editingEventId ? "Edit Event" : "Add Event"}
          </button>
        </form>
        <ul>
          {events.map(event => (
            <li key={event._id}>
              <h3>{event.eventName}</h3>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => deleteEvent(event._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
