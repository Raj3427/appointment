import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import the CSS file

import WelcomePage from './components/WelcomePage';
import DoctorRegistration from './components/DoctorRegistration';
import PatientRegistration from './components/PatientRegistration';
import LoginPage from './components/LoginPage';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';   

function App() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage setUserType={setUserType} />} />
          <Route path="/doctor-registration" element={<DoctorRegistration />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;