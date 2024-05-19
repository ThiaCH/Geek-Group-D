import { useState } from "react";

export default function AddEventForm () {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEvent = { eventName, eventDate, urlLink, description };

    const response = await fetch("/api/events", {
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
  };

  return (
    <>
      {/* Add/Edit Upcoming Event Form */}
        <div className='add-event-container'>
          <form onSubmit={handleSubmit} >
            <label>Event Name:</label>
            <input id="event-name" type="text" name="eventname" />
            <label>Event Date:</label>
            <input id="event-date" type="datetime-local" name="eventdate" />
            <label>URL Link (if applicable):</label>
            <input id="url-link" type="url" name="urllink" />
            <label>Description:</label>
            <textarea id="description" name="description" rows="10" ></textarea>
            <button type="submit">Add Event</button>
            <button type="submit">Edit Event</button>  
          </form>
        </div>
    </>
  )
}