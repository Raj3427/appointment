import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // Import the CSS file

function WelcomePage({ setUserType }) {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    setSelectedUserType(type);
    setUserType(type);
    localStorage.setItem('userType', type);

    // Redirect to the appropriate registration page based on the selected user type
    if (type === 'doctor') {
      navigate('/doctor-registration');
    } else if (type === 'patient') {
      navigate('/patient-registration');
    }
  };

  return (
    <div className="welcome-page">
      <h1>Welcome to Health Hub</h1>
      <p>Where doctors and patients connect seamlessly, offering a one-step solution for patients to book and begin their journey toward healing.</p>
      <div className="buttons">
        <button onClick={() => handleUserTypeSelection('doctor')}>I'm a Doctor</button>
        <button onClick={() => handleUserTypeSelection('patient')}>I'm a Patient</button>
      </div>
    </div>
  );
}

export default WelcomePage;