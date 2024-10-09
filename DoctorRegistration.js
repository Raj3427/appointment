import React, { useState } from 'react';
import './DoctorRegistration.css'; // Import the CSS file

function DoctorRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [workingHours, setWorkingHours] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // 1. Prepare registration data object
    const doctorData = {
      name,
      email,
      contact,
      password,
      address,
      specialization,
      experience,
      workingHours,
    };

    // 2. Store data in local storage (optional, see comments below)
    localStorage.setItem('doctorData', JSON.stringify(doctorData));

    // 3. Display success message and redirect to login page
    alert('Registration successful! You can now log in.');
    window.location.href = '/login';
  };

  return (
    <div className="doctor-registration">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="contact">Contact:</label>
        <input type="tel" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="address">Address:</label>
        <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>

        <label htmlFor="specialization">Specialization:</label>
        <input type="text" id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />

        <label htmlFor="experience">Experience (years):</label>
        <input type="number" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} required />

        <label htmlFor="workingHours">Working Hours:</label>
        <textarea id="workingHours" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} required></textarea>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default DoctorRegistration;