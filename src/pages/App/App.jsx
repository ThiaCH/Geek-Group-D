import debug from "debug";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import NavBarAdmin from "../../components/NavBar/NavBarAdmin";
import NavBarStudent from "../../components/NavBar/NavBarStudent";
import AuthPage from "../AuthPage/AuthPage";
import AdminPage from "../AdminPage/AdminPage";
import DashBoardPage from "../DashBoardPage/DashBoardPage";
import StudentUpdatePage from "../StudentUpdatePage/StudentUpdatePage";
import UpcomingEvent from "../UpcomingEventPage/UpcomingEventPage";
import ResourcePage from "../ResourcePage/ResourcePage";
import "bootstrap/dist/css/bootstrap.min.css";
import QR from "../../components/QR/QR";

// this enables debug module at the App.jsx only, this replaces console.log, you can see it at the browser devtool, enable the verbose level at web console
const log = debug("mern:pages:App:App"); // eslint-disable-line no-unused-vars
localStorage.debug = "mern:*";

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(getUser()); // getUser()
  const [newTime, setNewTime] = useState(new Date().getDate()); // eslint-disable-line no-unused-vars
  const [validLoginIds, setValidLoginIds] = useState("");

  const generateValidLoginIds = () => {
    const randomId = "GA" + Math.random().toString(36).substr(2, 10); // Generates a random string of 6 characters
    return randomId;
  };

  const handleGenerateIds = async () => {
    try {
      const ids = generateValidLoginIds();
      const response = await fetch("/api/users/loginId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginId: ids }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate IDs");
      }
      const data = await response.json();
      setValidLoginIds(data.loginId);
    } catch (error) {
      console.error("Error generating IDs:", error);
    }
  };

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
          <NavBarAdmin setUser={setUser} />
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/upcomingevent" element={<UpcomingEvent />} />
            <Route path="/resource" element={<ResourcePage />} />
            <Route path="/:className/dashboard" element={<DashBoardPage />} />
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route
              path="/admin/qr"
              element={
                <QR
                  handleGenerateIds={handleGenerateIds}
                  validLoginIds={validLoginIds}
                />
              }
            />
          </Routes>
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="App">
          <NavBarStudent user={user} setUser={setUser} />
          <Routes>
            <Route path="/:className/dashboard" element={<DashBoardPage />} />
            <Route
              path="/studentupdate"
              element={<StudentUpdatePage user={user} setUser={setUser} />}
            />
          </Routes>
        </main>
      </>
    );
  }
}
