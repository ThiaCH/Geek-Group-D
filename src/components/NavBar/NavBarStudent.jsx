import { Link, useLocation } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import '../../css/navbar.css'

export default function NavBar({ setUser, user }) {

  // Access current location
  const location = useLocation();
  // To check if current path is equal to '/studentupdate' 
  const isOnStudentPage = location.pathname === '/studentupdate'; 

  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

    return (
      <nav className="navbar">
        <div className="navbar-student-container">
          <div className="profile-container">
            {
              isOnStudentPage ?
              <Link to={`/${user.class}/dashboard`} className="update-profile">Dashboard</Link> :
              <Link to="/studentupdate" className="update-profile">Update Profile</Link>
            }
            <span className="separator"> | </span>
            <Link to="" onClick={handleLogOut} className="logout-link">Log Out</Link>
          </div>
        </div>
      </nav>
    )
}