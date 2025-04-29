import React, { useState } from 'react';
import './register.css';

function RegistrationForm() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact_no, setContactNo] = useState('');
  const [domain, setDomain] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!first_name || !last_name || !email || !contact_no || !domain) {
      setError('Please fill in all fields');
      setMessage('');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          contact_no,
          domain,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage(data || 'Registration successful!');
        setError('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setContactNo('');
        setDomain('');
        alert('Registration successful!');
      } else {
        setError(data || 'Registration failed. Please try again.');
        setMessage('');
      }
    } catch (error) {
      setError(`Something went wrong: ${error.message}`);
      setMessage('');
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <p>Fill in your personal details.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-group">
            <label>First Name:</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label>Contact Number:</label>
            <input
              type="text"
              value={contact_no}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label>Domain:</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </div>
        </div>

        <p className="login-text">
          Already have an account? <a href="/login">Login <span className="highlight">Here</span></a>
        </p>

        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
