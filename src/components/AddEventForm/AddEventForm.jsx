import Select from "react-select";
export default function AddEventForm({
  eventName,
  setEventName,
  eventDate,
  setEventDate,
  urlLink,
  setUrlLink,
  description,
  setDescription,
  selectedClasses,
  setSelectedClasses,
  editingEventId,
  setEditingEventId,
  classes,
  addEvent,
  editEvent,
}) {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      eventName,
      eventDate,
      urlLink,
      description,
      classes: selectedClasses,
    };
    editingEventId
      ? await editEvent(editingEventId, newEvent)
      : await addEvent(newEvent);
    setEventName("");
    setEventDate("");
    setUrlLink("");
    setDescription("");
    setSelectedClasses([]);
    setEditingEventId(null);
  };

  const handleClassChange = (selectedOptions) => {
    setSelectedClasses(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const classOptions = classes.map((cls) => ({
    value: cls._id,
    label: cls.className,
  }));


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
          <Select
            id="class"
            name="class"
            options={classOptions}
            isMulti
            value={classOptions.filter((option) =>
              selectedClasses.includes(option.value)
            )}
            onChange={handleClassChange}
            className="class-select"
            classNamePrefix="select"
          />
          <button type="submit">
            {editingEventId ? "Edit Event" : "Add Event"}
          </button>
        </form>
      </div>
    </>
  );
}
