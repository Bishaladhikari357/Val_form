import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/Loginsetup/AuthForm";
import Dashboard from "./components/Loginsetup/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default App;
