import EventList from "../../components/EventList/EventList";
import AddEventForm from "../../components/AddEventForm/AddEventForm";
import "../../css/event.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpcomingEvent() {
  const [events, setEvents] = useState([]);
  const [classes, setClasses] = useState([]);
  const { className } = useParams();

  useEffect(() => {
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

    fetchClasses();
    fetchEvents();
  }, []);

  const addEvent = async (newEvent) => {
    const response = await fetch("/api/users/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    const addedEvent = await response.json();
    setEvents((prevEvents) => [...prevEvents, addedEvent]);
  };

  const editEvent = async (id, updatedEvent) => {
    const response = await fetch(`/api/users/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });
    if (response.ok) {
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event._id === id ? updatedEvent : event))
      );
    }
  };

  const deleteEvent = async (id) => {
    const response = await fetch(`/api/users/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    }
  };


  return (
    <>
      <div className="main-event-container">
        <EventList classes={classes} events={events} className={className} />
        <AddEventForm classes={classes} events={events} addEvent={addEvent} editEvent={editEvent} deleteEvent={deleteEvent} />
      </div>
    </>
  );
}
