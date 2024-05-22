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
      <div className="container">
        <div className="add-event-container">
        <h1>Add Event Form</h1>
        
        <br/>

          <form onSubmit={handleSubmit} className="form-group">
            <label htmlFor="event-name">Event Name:</label>
            <input
              className="form-control"
              id="event-name"
              type="text"
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
            />
            <label htmlFor="event-date">Event Date:</label>
            <input
              className="form-control"
              id="event-date"
              type="datetime-local"
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
            />
            <label htmlFor="url-link">URL Link (if applicable):</label>
            <input
              className="form-control"
              id="url-link"
              type="url"
              value={urlLink}
              onChange={(event) => setUrlLink(event.target.value)}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
            <label htmlFor="class">Class:</label>
            <Select
              id="class"
              isMulti
              options={classOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={classOptions.filter(option => selectedClasses.includes(option.value))}
              onChange={handleClassChange}
            />
            <button type="submit" className="btn btn-primary mt-3">
              {editingEventId ? "Edit Event" : "Add Event"}
            </button>
          </form>

        </div>
      </div>
    </>
  );
}