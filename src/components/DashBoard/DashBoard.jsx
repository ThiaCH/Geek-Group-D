import '../../css/dashboard.css'

export default function DashBoard () {
  return (
    <>
      <div className='main-dashboard-container'> 
        <div className='unit-overview'>
          <h1>Unit Lesson Overview</h1>
          <ul>
            <li>To map list from Data</li>
          </ul>
        </div>
        
        <div className='other-container'>
          <div className='upcoming-events'>
            <h1>Upcoming Events</h1>
            <ul>
            <li>To map list from Data</li>
            </ul>
          </div>
          <div className='resources'>
            <h1>Resources</h1>
            <ul>
            <li>To map list from Data</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}