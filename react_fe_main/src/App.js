import React, { useState } from "react"
import { Provider } from 'react-redux';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import store from './store';
import './App.css';
import NoMatch from "./routes/NoMatch";
import Home from "./routes/Home";
import HelloWorld from "./routes/HelloWorld";
import Users from "./routes/Users";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="hello-world" element={<HelloWorld />} />
            <Route path="users" element={<Users />} />

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
  
  const express_be_main_fqdn = process.env.REACT_APP_EXPRESS_BE_MAIN_FQDN;

  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome to React</p>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hello-world">Hello world</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
          <li>
            <Link to={`${express_be_main_fqdn}`}>Express Home</Link>
          </li>
          <li>
            <Link to={`${express_be_main_fqdn}/hello-world`}>Express Hello world</Link>
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