import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css'; // Import the CSS file

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch the doctor's appointments from your backend
    fetch('/api/my-appointments')
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error('Error fetching appointments:', error));
  }, []);

  const handleLogout = () => {
    // Implement your logout logic (e.g., clear session or local storage)
    localStorage.removeItem('doctorId'); // Assuming doctorId is stored in local storage
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <div className="doctor-dashboard">
      <header>
        <h1>Health-Hub</h1>
        <nav>
          <button>View Appointments</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main>
        <h2>My Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Contact Details</th>
              <th>Problem</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.patientAge}</td>
                  <td>{appointment.patientContact}</td>
                  <td>{appointment.patientProblem}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colspan={7}>No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default DoctorDashboard;