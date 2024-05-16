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
              <Link to="" onClick={handleLogOut} className="update-profile">Update Profile</Link>
          <span className="separator"> | </span>
          <Link to="" onClick={handleLogOut} className="logout-link">Log Out</Link>
          </div>
        </div>
      </nav>
    )
}