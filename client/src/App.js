import "./index.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./Components/Authentication";
import Register from "./pages/Register";
const App = () => {
  return (
    <Authentication>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Authentication>
  );
};

export default App;
