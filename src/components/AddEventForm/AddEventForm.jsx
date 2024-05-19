import { useEffect, useState } from "react";

export default function AddEventForm() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Data fetching failed");
      const data = await response.json();
      setClasses(data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEvent = { eventName, eventDate, urlLink, description, classes: selectedClasses};

    const response = await fetch("/api/users/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to add event");
    }
    //* Reset Fields Upon Submission
    setEventName("");
    setEventDate("");
    setUrlLink("");
    setDescription("");
    setSelectedClasses([]);
  };

  const handleClassChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedClasses(selectedOptions);
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
          <button type="submit">Add Event</button>
          <button type="submit">Edit Event</button>
        </form>
      </div>
    </>
  );
}
