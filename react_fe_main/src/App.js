import React, { useEffect, useState } from "react"
import { Provider } from 'react-redux';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import axios from 'axios';
import store from './store';
import './App.css';
import NoMatch from "./routes/NoMatch";
import Home from "./routes/Home";
import UserContent from "./routes/UserContent";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="user/:id" element={<UserContent />} />

            {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>        
      </div>
    </Provider>
  );
}

function Layout() {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const express_be_main_fqdn = process.env.REACT_APP_EXPRESS_BE_MAIN_FQDN;
  
  const login = async () => {
    axios.post(`${express_be_main_fqdn}/auth`, { username: 'user1', password: 'abc' })
    .then(response => {
      localStorage.setItem('token', response.data.accessToken);
      setLoggedIn(true)
    });
  };

  useEffect(() => {    
      login();
  }, [login]);

  return (
    <div>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {loggedIn ? 'Logged in' : 'Not logged in' }
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default App;