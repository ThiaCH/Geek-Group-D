import EventList from "../../components/EventList/EventList";
import AddEventForm from "../../components/AddEventForm/AddEventForm";
import "../../css/event.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpcomingEvent() {
  const [events, setEvents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
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
    const updatedEventsRes = await fetch("/api/users/events/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedEvents = await updatedEventsRes.json();
    if (Array.isArray(updatedEvents)) {
      setEvents(updatedEvents);
    } else {
      setEvents([]);
    }
    if (!response.ok) {
      throw new Error("Failed to add event");
    }
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

  const handleEdit = (event) => {
    setEventName(event.eventName);
    setEventDate(event.eventDate);
    setUrlLink(event.urlLink);
    setDescription(event.description);
    setSelectedClasses(event.classes.map((cls) => cls._id));
    setEditingEventId(event._id);
  };

  return (
    <>
      <div className="main-event-container">
        <EventList
          classes={classes}
          events={events}
          className={className}
          handleEdit={handleEdit}
          deleteEvent={deleteEvent}
        />
        <AddEventForm
          eventName={eventName}
          setEventName={setEventName}
          eventDate={eventDate}
          setEventDate={setEventDate}
          urlLink={urlLink}
          setUrlLink={setUrlLink}
          description={description}
          setDescription={setDescription}
          selectedClasses={selectedClasses}
          setSelectedClasses={setSelectedClasses}
          editingEventId={editingEventId}
          setEditingEventId={setEditingEventId}
          classes={classes}
          events={events}
          addEvent={addEvent}
          editEvent={editEvent}
        />
      </div>
    </>
  );
}
