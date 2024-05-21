import { useEffect, useState } from "react";

export default function AddEventForm() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch("/api/users/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Class fetching failed");
      const data = await response.json();
      setClasses(data);
    };

    const fetchEvents = async () => {
      const response = await fetch("/api/users/events/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Events fetching failed");
      const data = await response.json();
      setEvents(data);
    };

    fetchClasses();
    fetchEvents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      eventName,
      eventDate,
      urlLink,
      description,
      classes: selectedClasses,
    };

    const response = await fetch(
      editingEventId
        ? `/api/users/events/${editingEventId}`
        : "/api/users/events",
      {
        method: editingEventId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      }
    );
    console.log(response);

    if (!response.ok) {
      throw new Error(`Failed to ${editingEventId ? "edit" : "add"} event`);
    }

    const updatedEventsRes = await fetch("/api/users/events/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    //* Reset Fields Upon Submission
    const updatedEvents = await updatedEventsRes.json();
    if (Array.isArray(updatedEvents)) {
      setEvents(updatedEvents);
    } else {
      setEvents([]);
    }
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

  const handleDelete = async (id) => {
    const response = await fetch(`/api/users/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }

    setEvents(events.filter((event) => event._id !== id));
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
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
