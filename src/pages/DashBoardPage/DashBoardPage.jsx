import { useEffect, useState } from "react";
import EventList from "../../components/EventList/EventList";
import "../../css/dashboard.css";
import { useParams } from "react-router-dom";

export default function DashBoard() {
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
  
  return (
    <>
      <div className="main-dashboard-container">
        <div className="unit-overview">
          <h1>Unit Lesson Overview</h1>
          <ul>
            <li>To map list from Data</li>
          </ul>
        </div>

        <div className="other-container">
          <div className="upcoming-events">
            <EventList events={events} className={className} />
          </div>
          {/* <div className="resources">
            <h1>Resources</h1>
            <ul>
              <li>To map list from Data</li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}