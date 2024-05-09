import {NavLink} from 'react-router-dom'

export default function NavBar() {
    return (
    <nav>
      <NavLink to="/orders">Order History</NavLink>
      &nbsp; | &nbsp;
      <NavLink to="/orders/new">New Order</NavLink>
    </nav>
    )
}