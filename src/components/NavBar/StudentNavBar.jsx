import {NavLink} from 'react-router-dom'
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
                <NavLink to="/dashboard">Dashboard</NavLink>
                <span className="separator"> | </span>
                <NavLink to="/particular">Update Particular</NavLink>
                <span className="separator"> | </span>
                <NavLink to="/" onClick={handleLogOut} className="logout-link">Log Out</NavLink>
            </div>
          </div>
        </nav>
      )
  }