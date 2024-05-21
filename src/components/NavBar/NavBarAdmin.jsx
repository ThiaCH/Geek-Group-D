import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import '../../css/navbar.css'

export default function NavBar({ setUser }) {


  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

    return (
      <nav className="navbar">
        <div className="navbar-admin-container">
          <div className="spacer"></div>
          <div className="options-container">
            <div className="dropdown">
              <button className="dropbtn">Options</button>
              <div className="dropdown-content">
                <Link to="/admin">Attendance</Link>
                <Link to="/upcomingevent">Upcoming Events</Link>
                <Link to="/resource">Resources</Link>
              </div>
            </div>
          <span className="separator"> | </span>
          <Link to="" onClick={handleLogOut} className="logout-link">Log Out</Link>
          </div>
        </div>
      </nav>
    )
}