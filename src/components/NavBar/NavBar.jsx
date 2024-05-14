import {Link, NavLink} from 'react-router-dom'
import * as userService from '../../utilities/users-service'


export default function NavBar({setUser}) {

  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

    return (
    <nav>
      <NavLink to="/orders">Order History</NavLink>
      &nbsp; | &nbsp;
      <NavLink to="/orders/new">New Order</NavLink>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
    )
}