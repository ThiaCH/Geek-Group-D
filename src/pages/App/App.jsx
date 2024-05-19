import debug from "debug"
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBarAdmin from "../../components/NavBar/NavBarAdmin";
import NavBarStudent from "../../components/NavBar/NavBarStudent";
import AdminPage from "../AdminPage/AdminPage";
import LessonPlanPage from "../LessonPlanPage/LessonPlanPage"
import UpcomingEventPage from "../UpcomingEventPage/UpcomingEventPage"
import ResourcePage from "../ResourcePage/ResourcePage"
// import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import DashBoardPage from "../DashBoardPage/DashBoardPage"
import StudentUpdatePage from "../StudentUpdatePage/StudentUpdatePage"
import { getUser } from "../../utilities/users-service";
// import StudentSignUp from "../StudentSignUpPage/StudentSignUpPage";


// this enables debug module at the App.jsx only, this replaces console.log, you can see it at the browser devtool, enable the verbose level at web console
const log = debug('mern:pages:App:App');
localStorage.debug = 'mern:*';

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(getUser()); // getUser()
  const location = useLocation(); 
  log("Test this is inside the App");

  const[newTime, setNewTime] = useState(new Date().getDate()); // eslint-disable-line no-unused-vars
  
  useEffect(() => {
    const interValid = setInterval(() => {
      setNewTime(new Date().getDate());
    }, 3600000);
  
    return () => clearInterval(interValid); // Cleanup function to stop the interval when component unmounts
  }, []);


  if (!user) {
    return (
      <main className="App">
        {/* <StudentSignUp setUser={setUser}/> */}
        <AuthPage setUser={setUser} />
      </main>
    );
  }

  // categorize route paths
  const adminPaths = ['/admin','/lessonplan', '/upcomingevent', '/resource']
  const studentPaths = ['/dashboard', '/studentupdate']

  return (
    <>
      <main className="App">
        
        {/* define the current route and show the appropriate NavBar -> admin / student */}
        {adminPaths.includes(location.pathname) && <NavBarAdmin setUser={setUser}/>}
        {studentPaths.includes(location.pathname) &&<NavBarStudent setUser={setUser}/>}

        <Routes>
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/lessonplan' element={<LessonPlanPage />} />
          <Route path='/upcomingevent' element={<UpcomingEventPage />} />
          <Route path='/resource' element={<ResourcePage />} />

          <Route path='/dashboard' element={<DashBoardPage />} />
          <Route path='/studentupdate' element={<StudentUpdatePage />} />
        </Routes>
      </main>
    </>
  );
}