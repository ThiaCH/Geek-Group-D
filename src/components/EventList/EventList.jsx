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
      {/* Event List Table */}
      <div className="jumbotron-container">
        <h1>Upcoming Event List</h1>

        <br/>

        <div className="row">
          <div className="col-12">
            <ul className="list-group">
              {filteredEvents.map((event, index) => (
                <li key={index} className="list-group-item">
                  <h3>{event.eventName}</h3>
                  <p>
                    <b>Date & Time: {" "}</b>
                    {moment(event.eventDate).format("DD/MM/YYYY, hh:mm A")}
                  </p>
                  {event.urlLink && (
                    <p>
                      <b>URL: </b> <a href={event.urlLink}>{event.urlLink}</a>
                    </p>
                  )}
                  <p><b>Description:</b> {event.description}</p>
                  <p>
                    <b>Class: {" "}</b>
                    {className
                      ? event.classes.map((cls) => cls.className).join(", ")
                      : event.classes
                          .map((clsId) => getClassNameById(clsId))
                          .join(", ")}
                  </p>
                  <div>
                    <button className="btn btn-info" onClick={() => handleEdit(event)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteEvent(event._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </div>
    </>
  );
}