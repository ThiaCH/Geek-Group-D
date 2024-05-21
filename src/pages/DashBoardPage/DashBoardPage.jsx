import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventList from "../../components/EventList/EventList";
import "../../css/dashboard.css";

export default function DashBoard () {

  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const { className } = useParams();


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


  useEffect(() => {
    fetchEvents();
  }, []);


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

  useEffect(() => {
    fetchResources();
  }, []);
  
  
  return (
    <>
      <div className="main-dashboard-container">

          <div className="upcoming-events">
            <h1>Upcoming Events for {className}</h1>
            <EventList events={events} className={className} />
          </div>

          <div className="resources">
            <h1>Resources</h1>
            <ul>
              {resources.map(resource => (
                <li key={resource._id}>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.website}
                  </a>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </>
  );
}