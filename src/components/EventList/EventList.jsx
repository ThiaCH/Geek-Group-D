import moment from "moment";

export default function EventList({ events }) {
  return (
    <>
      {/* Event List Table */}
      <div className="event-list">
        <h1>Upcoming Events</h1>
        <hr />
        <ul>
          {events.map((event, index) => (
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
