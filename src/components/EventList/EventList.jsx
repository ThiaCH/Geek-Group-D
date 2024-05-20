import moment from "moment";

export default function EventList({ events, className }) {
  const filteredEvents = className
    ? events.filter(
        (event) => event.classes[0].className === className.toUpperCase()
      )
    : events;
  console.log(filteredEvents);
  return (
    <>
      {/* Event List Table */}
      <div className="event-list">
        <h1>Upcoming Events</h1>
        <hr />
        <ul>
          {filteredEvents.map((event, index) => (
            <li key={index}>
              <h3>{event.eventName}</h3>
              {console.log(event.classes[0].className)}
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
                Class: {event.classes.map((cls) => cls.className).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
