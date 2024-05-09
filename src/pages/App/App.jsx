import debug from "debug"
import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import {Routes, Route} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar";

// this enables debug module at the App.jsx only, this replaces console.log, you can see it at the browser devtool, enable the verbose level at web console
const log = debug('mern:pages:App:App');
localStorage.debug = 'mern:*';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  log("Test this is insde the App");

  if (!user) {
    return (
      <main className="App">
        <AuthPage />
      </main>
    );
  }

  return (
    <>
      <main className="App">
        <NavBar />
        <Routes>
          <Route path='/orders' element={<NewOrderPage />} />
          <Route path='/orders/new' element={<OrderHistoryPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App
