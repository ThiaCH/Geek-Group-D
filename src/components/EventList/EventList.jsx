import moment from "moment";

export default function EventList({ classes, events, className, handleEdit, deleteEvent }) {
  const filteredEvents = className
    ? events.filter((event) =>
        event.classes.some((cls) => cls.className === className.toUpperCase())
      )
    : events;

  const getClassNameById = (id) => {
    const cls = classes.find((cls) => cls._id === id);
    return cls ? cls.className : "Unknown Class";
  };

  return (
    <>
    {/* Event List Layout */}
    <div className="jumbotron">
      <h1>Upcoming Event List</h1>
      
      <br/>

        {filteredEvents.map((event, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h3 className="card-title">{event.eventName}</h3>
              <p className="card-text">
                <strong>Date & Time:</strong> {moment(event.eventDate).format("DD/MM/YYYY, hh:mm A")}
              </p>
              {event.urlLink && (
                <p className="card-text">
                  <strong>URL:</strong> <a href={event.urlLink}>{event.urlLink}</a>
                </p>
              )}
              <p className="card-text"><strong>Description:</strong> {event.description}</p>
              <p className="card-text">
                <strong>Class:</strong> {className
                  ? event.classes.map((cls) => cls.className).join(", ")
                  : event.classes.map((clsId) => getClassNameById(clsId)).join(", ")}
              </p>
              <div>
                <button className="btn btn-primary" onClick={() => handleEdit(event)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteEvent(event._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}

    </div>
    </>
  );
}
