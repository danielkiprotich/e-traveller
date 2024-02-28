import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TripsPage from "./pages/Trips";
import BusesPage from "./pages/Buses";
import UsersPage from "./pages/Users";
import Tickets from "./components/ticket/Tickets";

const App = function AppWrapper() {
  const urlParams = new URLSearchParams(window.location.search);
  const canisterId = urlParams.get("canisterId");

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BusesPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </Router>
  );
};

export default App;
