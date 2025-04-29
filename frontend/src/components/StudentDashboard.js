import React, { useState } from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentname: '',
    contact_no: '',
    email: '',
    password: '',
    domain: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents(prev => [...prev, formData]);
    setFormData({
      studentname: '',
      contact_no: '',
      email: '',
      password: '',
      domain: ''
    });
  };

  const filteredStudents = students.filter(student =>
    student.studentname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <img src="/cgsss.jpeg" alt="Logo" className="logo" />
        <button className="nav-btn">NEW</button>
        <button className="nav-btn">COUNT</button>
      </aside>

      <main className="main-content">
      <div className="search-container">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="form-container">
          <h1> Student Details</h1>
          <form onSubmit={handleSubmit}>
            <label>Student Name:</label>
            <input
              type="text"
              name="studentname"
              value={formData.studentname}
              onChange={handleChange}
              required
            />
            <label>Contact Number:</label>
            <input
              type="tel"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleChange}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {/* <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            /> */}
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
          >
            <option value="">Select Role</option>
            <option value="HR">HR</option>
            <option value="Student">Student</option>
          </select>


            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>

        

        {/* <div className="student-list">
          <h2>Total Students: {filteredStudents.length}</h2>
          <ul>
            {filteredStudents.map((student, idx) => (
              <li key={idx}>
                <p><strong>Name:</strong> {student.studentname}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.contact_no}</p>
                <p><strong>Domain:</strong> {student.domain}</p>
              </li>
            ))}
          </ul>
        </div> */}
      </main>
    </div>
  );
};

export default StudentDashboard;