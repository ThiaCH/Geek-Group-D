import debug from "debug"
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom' // eslint-disable-line no-unused-vars
import NavBar from "../../components/NavBar/NavBar";
import AdminPage from "../AdminPage/AdminPage";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import StudentNavBar from "../../components/NavBar/StudentNavBar"
// import StudentSignUp from "../StudentSignUpPage/StudentSignUpPage";


// this enables debug module at the App.jsx only, this replaces console.log, you can see it at the browser devtool, enable the verbose level at web console
const log = debug('mern:pages:App:App'); // eslint-disable-line no-unused-vars
localStorage.debug = 'mern:*';

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(getUser()); // getUser()

  const[newTime, setNewTime] = useState(new Date().getDate()); // eslint-disable-line no-unused-vars
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNewTime(new Date().getDate());
    }, 3600000);
  
    return () => clearInterval(intervalId); // Cleanup function to stop the interval when component unmounts
  }, []);


  if (!user) {
    return (
      <main className="App">
        {/* <StudentSignUp setUser={setUser}/> */}
        <AuthPage setUser={setUser} />
      </main>
    );
  } else if (user && user.isAdmin === true) {
    return (
      <>
      <main className="App">
        <NavBar setUser={setUser}/>
        <Routes>
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </main>
      </>
    );
  }

  // if (user && user.role === 'admin') {
  //   return <Navigate to="/admin" />;
  // }

  return (
    <>
      <main className="App">
        <StudentNavBar setUser={setUser}/>
        <p>student dashboard page here</p>
      </main>
    </>
  );
}





