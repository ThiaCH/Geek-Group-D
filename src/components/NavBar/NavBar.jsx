import {Link} from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import '../../css/styles.css'

export default function NavBar({setUser}) {

  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="spacer"></div>
          <div className="options-container">
            <div className="dropdown">
              <button className="dropbtn">Options</button>
              <div className="dropdown-content">
                <Link to="/attendance">Attendance</Link>
                <Link to="/lesson-plan">Lesson Plan</Link>
                <Link to="/upcoming-events">Upcoming Events</Link>
                <Link to="/Resources">Resources</Link>
              </div>
            </div>
          <span className="separator"> | </span>
          <Link to="" onClick={handleLogOut} className="logout-link">Log Out</Link>
          </div>
        </div>
      </nav>
    )
}