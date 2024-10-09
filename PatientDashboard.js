import React, { useState, useEffect } from 'react';
import './PatientDashboard.css'; // Import the CSS file

function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime,   
 setSelectedTime] = useState('');   

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [bookingErrorMessage, setBookingErrorMessage] = useState('');
  const [appointments, setAppointments] = useState([]);



  useEffect(() => {
    // Fetch the list of available doctors from your backend
    fetch('/api/doctors')
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  const handleBookAppointment = () => {
    // Validate selected doctor, date, and time
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setBookingErrorMessage('Please select a doctor, date, and time.');
      return;
    }

    // Check if the selected slot is available
    fetch('/api/check-slot-availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        doctorId: selectedDoctor.id,
        date: selectedDate,
        time: selectedTime,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.isAvailable) {
        // Book the appointment
        fetch('/api/book-appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doctorId: selectedDoctor.id,
            patientId: localStorage.getItem('patientId'), // Assuming patientId is stored in local storage
            date: selectedDate,
            time: selectedTime,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setIsBookingConfirmed(true);
              setBookingErrorMessage('');
            } else {
              setBookingErrorMessage('Error booking appointment.');
            }
          })
          .catch((error) => console.error('Error booking appointment:', error));
        } else {
          setBookingErrorMessage('Slot unavailable.');
        }
      })
      .catch((error) => console.error('Error checking slot availability:', error));
  };

  return (
    <div className="patient-dashboard">
      <header>
        <h1>Health-Hub</h1>
        <nav>
          <button>Book Appointment</button>
          <button>My Appointments</button>
          <button>Logout</button>
        </nav>
      </header>

      <main>
        <h2>Available Doctors</h2>
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id}>
              <div>
                <h3>{doctor.name}</h3>
                <p>Specialization: {doctor.specialization}</p>
                <p>Experience: {doctor.experience} years</p>
              </div>
              <button onClick={() => handleBookAppointment(doctor.id)}>Book Appointment</button>
            </li>
          ))}
        </ul>
        <div className="book-appointment-form">
          <label htmlFor="doctor">Doctor:</label>
          <select id="doctor" value={selectedDoctor?.id || ''} onChange={(e) => setSelectedDoctor(doctors.find((doctor) => doctor.id === e.target.value))}>
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>   


          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

          <label htmlFor="time">Time:</label>
          <select id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            <option value="">Select a time</option>   

            {/* Add available time slots based on the doctor's availability */}
          </select>

          <button onClick={handleBookAppointment}>Book Appointment</button>

          {isBookingConfirmed && <p>Appointment booked successfully!</p>}
          {bookingErrorMessage && <p>{bookingErrorMessage}</p>}
        </div>
        <h2>My Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Contact Number</th>
              <th>Appointment Time</th>
              <th>Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.doctorContact}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.appointmentDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colspan={5}>No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default PatientDashboard;