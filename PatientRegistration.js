import React, { useState } from 'react';
import './PatientRegistration.css'; // Import the CSS file

function PatientRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [problem, setProblem] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // 1. Prepare registration data object
    const patientData = {
      name,
      email,
      contact,
      password,
      age,
      gender,
      address,
      problem,
    };

    // 2. Store data in local storage
    localStorage.setItem('patientData', JSON.stringify(patientData));

    // 3. (Optional) Display success message or redirect to login page
    alert('Registration successful! You can now log in.');
    // Replace 'login-page' with the actual path to your login page
    // window.location.href = '/login';

    const storedPassword = localStorage.getItem('password');
console.log(storedPassword);

    // 4. Clear the form after successful registration (optional)
    setName('');
    setEmail('');
    setContact('');
    setPassword('');
    setAge('');
    setGender('');
    setAddress('');
    setProblem('');
  };

  return (
    <div className="patient-registration">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="contact">Contact:</label>
        <input type="tel" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />

        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="address">Address:</label>
        <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>

        <label htmlFor="problem">Problem:</label>
        <textarea id="problem" value={problem} onChange={(e) => setProblem(e.target.value)} required></textarea>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default PatientRegistration;