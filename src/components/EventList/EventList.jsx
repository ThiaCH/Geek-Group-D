import moment from "moment";

export default function EventList({ classes, events, className }) {
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
      <div className="upcoming-events">
        <ul>
          {filteredEvents.map((event, index) => (
            <li key={index}>
              <h3>{event.eventName}</h3>
              <p>
                Date & Time:{" "}
                {moment(event.eventDate).format("DD/MM/YYYY, hh:mm A")}
              </p>
              {event.urlLink && (
                <p>
                  URL: <a href={event.urlLink}>{event.urlLink}</a>
                </p>
              )}
              <p>Description: {event.description}</p>
              <p>
                Class:{" "}
                {className
                  ? event.classes.map((cls) => cls.className).join(", ")
                  : event.classes
                      .map((clsId) => getClassNameById(clsId))
                      .join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
