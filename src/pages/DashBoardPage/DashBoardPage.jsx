import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/dashboard.css";
import moment from "moment";

export default function DashBoard() {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [classes, setClasses] = useState([]);
  const { className } = useParams();

  const getClassNameById = (id) => {
    const cls = classes.find((cls) => cls._id === id);
    return cls ? cls.className : "Unknown Class";
  };

  const filteredEvents = className
    ? events.filter((event) =>
        event.classes.some(
          (cls) => getClassNameById(cls) === className.toUpperCase()
        )
      )
    : events;

  useEffect(() => {
    fetchEvents();
    fetchClasses();
    fetchResources();
  }, []);

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

  const fetchResources = async () => {
    try {
      const response = await fetch("/api/resources/resources");
      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  return (
    <>
      <div className="main-dashboard-container">

        {/* For Upcoming Events */}
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8">
              <h2>Upcoming Events</h2>
              {filteredEvents.map((event, eventIndex) => (
                <div
                  className="card mb-3"
                  key={`event-${event.id || eventIndex}`}
                >
                  <div className="card-body">
                    <h4 className="card-title">{event.eventName}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Date & Time: {moment(event.eventDate).format("DD/MM/YYYY, hh:mm A")}
                    </h6>
                    <p className="card-text">Description: {event.description}</p>
                    <p className="card-text">
                      <a href={event.urlLink} target="_blank" rel="noopener noreferrer">
                      {event.urlLink}
                      </a>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Class: {" "}
                        {event.classes.map((cls, classIndex) => (
                          <span key={`class-${cls._id}-${classIndex}`}> 
                            {getClassNameById(cls)}
                            {classIndex < event.classes.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </small>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* For Resources */}
            <div className="col-md-4">
              <h2>Resources</h2>
              <div className="card">
                <div className="card-body">
                  <ul className="list-group">
                    {resources.map((resource, resourceIndex) => (
                      <li
                        className="list-group-item"
                        key={`resource-${resource._id}-${resourceIndex}`}
                      >
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {resource.website}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
