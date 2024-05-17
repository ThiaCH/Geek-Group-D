import EventList from '../../components/EventList/EventList'
import AddEventForm from '../../components/AddEventForm/AddEventForm'
import '../../css/event.css'

export default function UpcomingEvent () {
  return (
    <>
      <div className="main-event-container">
        <EventList />
        <AddEventForm />
      </div>
    </>
  )
}