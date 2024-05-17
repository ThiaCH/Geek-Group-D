
export default function AddEventForm () {

  return (
    <>
      {/* Add/Edit Upcoming Event Form */}
        <div className='add-event-container'>
          <form >
            <label>Event Name:</label>
            <input id="event-name" type="text" name="eventname" />
            <label>Event Date:</label>
            <input id="event-date" type="datetime-local" name="eventdate" />
            <label>URL Link (if applicable):</label>
            <input id="url-link" type="url" name="urllink" />
            <label>Description:</label>
            <textarea id="description" name="description" rows="10" ></textarea>
            <button type="submit">Add Event</button>
            <button type="submit">Edit Event</button>  
          </form>
        </div>
    </>
  )
}