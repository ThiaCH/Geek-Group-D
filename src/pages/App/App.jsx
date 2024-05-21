import debug from "debug";
import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { getUser } from "../../utilities/users-service"; 
import NavBarAdmin from "../../components/NavBar/NavBarAdmin";
import NavBarStudent from "../../components/NavBar/NavBarStudent";
import AuthPage from "../AuthPage/AuthPage";
import AdminPage from "../AdminPage/AdminPage";
import DashBoardPage from "../DashBoardPage/DashBoardPage"
import StudentUpdatePage from "../StudentUpdatePage/StudentUpdatePage"
import UpcomingEvent from "../UpcomingEventPage/UpcomingEventPage";
import ResourcePage from "../ResourcePage/ResourcePage"


// this enables debug module at the App.jsx only, this replaces console.log, you can see it at the browser devtool, enable the verbose level at web console
const log = debug('mern:pages:App:App'); // eslint-disable-line no-unused-vars
localStorage.debug = 'mern:*';

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(getUser()); // getUser()
  const[newTime, setNewTime] = useState(new Date().getDate()); // eslint-disable-line no-unused-vars
  
  useEffect(() => {
    const interValid = setInterval(() => {
      setNewTime(new Date().getDate());
    }, 3600000); 
  
    return () => clearInterval(interValid); // Cleanup function to stop the interval when component unmounts
  }, []);


  if (!user) {
    return (
      <>
      <main className="App">
        <AuthPage setUser={setUser} />
      </main> 
      </>
    );
  } else if (user && user.isAdmin === true) {
    return (
      <>
      <main className="App">
        <NavBarAdmin setUser={setUser}/>
        <Routes>
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/upcomingevent' element={<UpcomingEvent />} />
          <Route path="/resource" element={<ResourcePage />} />
        </Routes>
      </main>
      </>
    );
  } else {
    return (
      <>
        <main className="App">
          <NavBarStudent setUser={setUser}/>
          <Routes>
            <Route path="/:className/dashboard" element={<DashBoardPage />} />
            <Route path="/studentupdate" element={<StudentUpdatePage user={user} setUser={setUser}/>} />
          </Routes>
        </main>
      </>
    );
  }
}