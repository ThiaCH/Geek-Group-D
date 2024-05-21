import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import EventList from "../../components/EventList/EventList";
import "../../css/dashboard.css";

export default function DashBoard() {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  // const { className } = useParams();


  useEffect(() => {
    fetchEvents();
    fetchResources();
  }, []);


  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/users/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const eventData = await response.json();
      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  };


  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resources/resources');
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
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
              {events.map((event, eventIndex) => (
                <div className="card mb-3" key={`event-${event.id || eventIndex}`}>
                  <div className="card-body">
                    <h4 className="card-title">{event.eventName}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Date & Time: {new Date(event.eventDate).toLocaleString()}
                    </h6>
                    <p className="card-text">{event.description}</p>
                    {/* To Fixed */}
                    <p className="card-text"><small className="text-muted">Class: 
                      {event.classes.map((cls, classIndex) => (
                        <span key={`class-${cls._id}-${classIndex}`}>{cls.name}{classIndex < event.classes.length - 1 ? ', ' : ''}</span>
                      ))}
                    </small></p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* For Resources */}
            <div className="col-md-4">
              <h2>Resources</h2>
              <div className="card">
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {resources.map((resource, resourceIndex) => (
                      <li className="list-group-item" key={`resource-${resource._id}-${resourceIndex}`}>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
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
