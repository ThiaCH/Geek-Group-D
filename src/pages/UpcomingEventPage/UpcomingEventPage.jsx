import EventList from "../../components/EventList/EventList";
import AddEventForm from "../../components/AddEventForm/AddEventForm";
import "../../css/event.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpcomingEvent() {
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
      <div className="main-event-container">
        <EventList events={events} className={className} />
        <AddEventForm />
      </div>
    </>
  );
}
